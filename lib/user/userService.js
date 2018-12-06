var emoji_schema = require('../schema/emojiapp')
var securePin = require("secure-pin");
var bcrypt = require('bcrypt');
var util = require('../appUtil')
const userConst = require('./userConstants')
var cloudinary = require('cloudinary');
const fileUtil = require('../middleware/multer_file')
const jwtHandler = require('../jwtHandlers')
const userMapper = require('./userMapper');
const adminMapper=require('../admin/adminMapper')
cloudinary.config(userConst.CLOUDINARY);

function register(req, res) {

	var pin = securePin.generatePinSync(4);
	req.body.pin = pin;
	req.body.password = bcrypt.hashSync(req.body.password, 10);

	emoji_schema.findOne({ $or: [{ "emailId": req.body.emailId }, { "contactNumber": req.body.contactNumber }] }).then(async (result) => {
		if (result) {
			return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.emailAlreadyRegistered })
		}
		else {
			var User = new emoji_schema(req.body)
			User.save(async (data) => {

				let msgBody = `Please verify your account using this pin:- ${pin}`;

				await util.sendMessage(msgBody, req.body.contactNumber);

				let html = `<b> Please verify your account using this pin:-</b><h1>${pin}</h1>`;

				await util.sendMail(req.body.emailId, userConst.MAILOBJ.regiterMailSubject, html).then((body) => {
					if (body) {
						return res.json({ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.sucessfullyRegister })
					}
					else {
						return res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError })
					}
				})
			})
		}
	}).catch(err => { res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError }) })
}

function verifyAccount(req, res) {
	emoji_schema.findById({ "_id": req.params.id }).then((result) => {
		if (req.body.pin == result.pin) {
			emoji_schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { isVerify: true } }, { new: true }).then((data) => {
				return res.json({ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.pinVerifieldSucess })
			})
		}
		else {
			return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.invalidPin })
		}
	}).catch(err => { res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError }) })
}

function resendPin(req, res) {
	var newPin = securePin.generatePinSync(4);
	emoji_schema.findOne({ "_id": req.params.id }).then(async (data) => {
		if (data) {
			if (data.isVerify == true) {
				return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.alreadyVerified })
			}
			else {

				let msgBody = `Please verify your account using this pin :- ${newPin}`
				await util.sendMessage(msgBody, data.contactNumber)
				let html = `<b>Please verify your account using this pin:-</b><h3>${newPin}</h3>`

				await util.sendMail(data.emailId, userConst.MAILOBJ.regiterMailSubject, html).then((result) => {
					if (result) {
						emoji_schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { pin: newPin } }, { new: true }, (err, body) => {
							return res.json({ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.pinSentsucess })
						})
					}
					else {
						return res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError })
					}
				}).catch(err => { return res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError }) })
			}
		} else {
			return res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError })
		}
	})

}

function login(req, res) {
	emoji_schema.findOne({ "emailId": req.body.emailId }, async (err, data) => {
		if (err) {

			return res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError })
		}
		else if (!data) {
			return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.incorrectEmailid })
		}
		else {
			if(data.role == 'ADMIN')
			{
				const match = await bcrypt.compare(req.body.password, data.password);
				if (match) {
					return jwtHandler.genAdminToken({ id: data._id }).then((jwt) => {
						return adminMapper.loginResponse(data, jwt).then((resp) => {
								return res.json({ resp })
							})
	
						})
	
					}
				else {
						return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.invalidPassword })
					}
	
			}
			
			else if(data.role=='USER')
			{
				if (data.isVerify)
				 {
					const match = await bcrypt.compare(req.body.password, data.password);
						if (match)
						 {
							return jwtHandler.genUsrToken({ id: data._id }).then((jwt) => {
								return userMapper.loginResponse(data, jwt).then((resp) => {
								return res.json({ resp })
							})
							})		
						}
						else 
						{
						return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.invalidPassword })
						}
					}
				else
				{
				return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.errorInVerifyAccount })
				}
		}
	}
}).catch(err => { res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError }) })
}

function forgotPassword(req, res) {
	emoji_schema.findOne({ "emailId": req.body.emailId }, async (err, data) => {
		if (err) {
			return res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError })
		}
		else if (!data) {
			return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.incorrectEmailid })

		}
		else {
			var password = securePin.generatePinSync(6);
			let html = `We received a request to reset your EmojiApp password. Your new password is  :-</b><h1>${password}</h1>`

			util.sendMail(data.emailId, userConst.MAILOBJ.forgotPasswordMailSubject, html).then((result) => {
				if (result) {
					var Password = bcrypt.hashSync(password, 10);
					emoji_schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { password: Password } }, { new: true }, (err, result1) => {
						return res.json({ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.forgetPasswordMail })

					})
				}
			}).catch(err => { res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError }) })
		}
	})
}

function changePassword(req, res) {
	var newpass = bcrypt.hashSync(req.body.newPassword, 10);
	emoji_schema.findOne({ "_id": req.params.id }).then((result) => {
		{
			var match = bcrypt.compare(req.body.oldPassword, result.password).then((result1) => {
				if (result1 == true) {
					emoji_schema.findOneAndUpdate({ _id: result._id }, { $set: { password: newpass } }).then((result2) => {
						return res.json({ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.passwordUpdatedSucess })
					})
				}
				else {
					return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.invalidPassword })
				}
			})
		}
	}).catch(err => { res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError }) })
}

function editProfile(req, res) {
	let update = {};
	update['$set'] = req.body;
	emoji_schema.findOneAndUpdate({ "_id": req.params.id }, update, { new: true }, (err, data) => {
		if (err) {

			return res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError })
		}
		else {
			
			return res.json({ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.editSuccess })
		}

	})

}

function socialLogin(req, res) {

	emoji_schema.findOne({ "socialId": req.body.socialId }).then(async (data) => {
		if (data) {
			return jwtHandler.genUsrToken({ id: data._id }).then((jwt) => {

				return userMapper.loginResponse(data, jwt).then((resp) => {
					return res.json({ resp })
				})

			})
		}
		else {
			var user = new emoji_schema(req.body)
			user.save((err, body) => {
				if (err) {
					console.log(err)
					return res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError })
				}
				else {
					return res.json({ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.sucessfullyRegister })
				}
			})
		}
	})
}

function imageUpload(req, res) {

	req.newFile_name = [];

	fileUtil.upload(req, res, async function (err) {
		if (err) {
			return res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError })
		}
		else {
			let multipleUpload = new Promise(async (resolve, reject) => {
				let upload_len = req.newFile_name.length
					, upload_res = new Array();
				await req.newFile_name.map(async (image) => {
					let filePath = image;

					await cloudinary.v2.uploader.upload(`${process.cwd()}/img/${filePath}`, async (error, result) => {
						if (result) {
							try {

								let response_unlink = await require('fs').unlink(`${process.cwd()}/img/${filePath}`);
							} catch (e) {
								console.log('error in callback', e)
								return res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError });
							}
							upload_res.push(result.url);
						}
						if (upload_res.length === upload_len) {
							resolve(upload_res)
						} else if (error) {
							console.log(error)
							reject(error)
						}

					})
				})
			}).then((result) => result).catch((error) => error)
			let upload = await multipleUpload;
			return res.json({ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.imageUpload, data: upload })
		}
	});
}


module.exports =
	{

		register,
		verifyAccount,
		resendPin,
		login,
		forgotPassword,
		changePassword,
		editProfile,
		socialLogin,
		imageUpload,

	}