var emoji_schema = require('../schema/emojiapp')
var securePin = require("secure-pin");
// var accountSid = 'ACffbfbd1157bb9483f5468c170e724068';
// const authToken = 'b90802d6d9bc7524feba86ea00c3a24f';
// const client = require('twilio')(accountSid, authToken)
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = 'this_is-a-secret';
// var code = require("../responseHandler.js").http_codes
// var msg = require("../responseHandler.js").message
var util = require('../appUtil')
const userConst = require('./userConstants')
var cloudinary = require('cloudinary');
const fileUtil = require('../middleware/multer_file')
const jwtHandler = require('../jwtHandlers')
const userMapper = require('./userMapper');
cloudinary.config({
	cloud_name: 'yunu121',
	api_key: '579755252783132',
	api_secret: 'uRQjHh6oz--PCimbyB87XztRm68'
});



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

				let msgBody = `Thanks For Registration :- ${pin}`;

				await util.sendMessage(msgBody, req.body.contactNumber);

				let html = `<b>Your Pin Is:-</b><h1>${pin}</h1>`;

				await util.sendMail(req.body.emailId, userConst.MAILOBJ.regiterMailSubject, html).then((body) => {
					if (body) {
						return res.json({ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.sucessfullyRegister })
					}
					else {
						return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.internalServerError })
					}
				})
			})
		}
	}).catch(err => { res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.internalServerError }) })
}

function verifyPin(req, res) {
	emoji_schema.findById({ "_id": req.params.id }).then((result) => {
		if (req.body.pin == result.pin) {
			emoji_schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { isVerify: true } }, { new: true }).then((data) => {
				return res.json({ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.pinVerifieldSucess })
			})
		}
		else {
			return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.invalidPin })
		}
	}).catch(err => { res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.internalServerError }) })
}

function resendPin(req, res) {

	var user = new emoji_schema(req.body)
	var pin = securePin.generatePinSync(4);
	user.pin = pin;
	emoji_schema.findOne({ "_id": req.params.id }).then(async (data) => {
		if (data) {

			if (data.isVerify == true) {
				return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.alreadyVerified })
			}
			else {

				let msgBody = `Thanks For Registration :- ${pin}`
				await util.sendMessage(msgBody, data.contactNumber)
				let html = `<b>Your Pin Number Is:-</b><h1>${pin}</h1>`
				await util.sendMail(data.emailId, userConst.regiterMailSubject, html).then((result) => {
					if (result) {
						emoji_schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { pin: pin } }, { new: true }, (err, body) => {
							return res.json({ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.pinSentsucess })
						})
					}
					else {
						return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.internalServerError })
					}
				}).catch(err => { return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.internalServerError }) })
			}
		} else {
			return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.internalServerError })
		}
	})

}

async function login(req, res) {
	emoji_schema.findOne({ $or: [{ "emailId": req.body.emailId }, { "contactNumber": req.body.contactNumber }] }, async (err, data) => {
		if (err) {

			return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.internalServerError })
		}
		else if (!data) {
			return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.incorrectEmailid })
		}
		else {

			if (data.isVerify) {
				const match = await bcrypt.compare(req.body.password, data.password);

				if (match) {

					return jwtHandler.genUsrToken({ Phonenumber: data.contactNumber, id: data._id }).then((jwt) => {

						return userMapper.loginResponse(data, jwt).then((resp) => {
							return res.json({ resp })
						})

					})

				}
				else {
					return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.invalidPassword })
				}

			}
			else {
				return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.errorInVerifyAccount })
			}
		}
	}).catch(err => { res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.internalServerError }) })
}

function forgotPassword(req, res) {
	emoji_schema.findOne({ $or: [{ "emailId": req.body.emailId }, { "contactNumber": req.body.contactNumber }] }, async (err, data1) => {
		if (err) {
			return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.internalServerError })
		}
		else if (!data1) {
			return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.incorrectEmailid })

		}
		else {
			var password = securePin.generatePinSync(6);
			let html = `<b>Your New Password  Is:-</b><h1>${password}</h1>`
			
			util.sendMail(data1.emailId, userConst.MAILOBJ.forgotPasswordMailSubject, html).then((result) => {
				if (result) {
					var Password = bcrypt.hashSync(password, 10);
					emoji_schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { password: Password } }, { new: true }, (err, result1) => {
						return res.json({ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.passwordUpdatedSucess })

					})
				}
			}).catch(err => { res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.internalServerError }) })
		}
	})
}

function changePassword(req, res) {

	var oldpass = bcrypt.hashSync(req.body.oldPassword, 10);
	var newpass = bcrypt.hashSync(req.body.newPassword, 10);

	emoji_schema.find({ "_id": req.params.id }).then((result) => {
		{
			console.log(",,,,,,,,,,,,,,",result.id)
			var match = bcrypt.compare(req.body.oldPassword, result[0].password).then((result1) => {
				if (result1 == true) {
					emoji_schema.findOneAndUpdate({ _id: result[0]._id }, { $set: { password: newpass } }).then((result2) => {
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
	emoji_schema.find({ "_id": req.params.id }).then((result) => {
	emoji_schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { userName: req.body.userName, fullName: req.body.fullName, image: req.body.image } }, (err, data) => {
		if (err) {
		
			return res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError })
		}
		else {

			return res.json({ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.editSuccess })
		}

	})
})
}

// function socialLogin(req, res) {
// 	console.log("Into socialLoggin Page")
// 	emoji_schema.findOne({ "emailId": req.body.emailId }).then(async (data) => {
// 		if (data) {
// 			const match = await bcrypt.compare(req.body.password, data.password);
// 			if (match) {
// 				const token = await jwt.sign({ Phonenumber: data.contactNumber, id: data._id }, secret, { expiresIn: 60 * 60 });
// 				let newObj = {
// 					_id: data._id,
// 					fullName: data.fullName,
// 					userName: data.userName,
// 					emailId: data.emailId,
// 					contactNumber: data.contactNumber,
// 					image: data.image,
// 				}
// 				return res.json({ code: code.ok, message: msg.sucessfullyLogin, data: newObj, token: token })
// 				exit();
// 			}
// 			else {
// 				return res.json({ code: code.internalError, message: msg.incorrectPassword })
// 			}
// 		}
// 		else {
// 			console.log("Into socialregi Page reg")
// 			var user = new emoji_schema(req.body)
// 			var pin = securePin.generatePinSync(4);
// 			user.pin = pin;
// 			user.password = bcrypt.hashSync(req.body.password, 10);
// 			user.save(async (data) => {
// 				let msgBody = `Thanks For Registration :- ${pin}`
// 				await util.sendMessage(msgBody, req.body.contactNumber)
// 				let html = `<b>Your Pin Is:-</b><h1>${pin}</h1>`
// 				await util.sendMail(req.body.emailId, userConstants.regiterMailSubject, html).then((body) => {
// 					if (body) {
// 						return res.json({ code: code.ok, message: msg.sucessfullyRegister });
// 					}
// 					else {
// 						return res.json({ code: code.badRequest, message: msg.errorInUserRegistration })
// 					}
// 				})
// 			}).catch(err => { res.json({ code: code.internalError, message: msg.internalServerError }) })
// 		}
// 	})
// }

function socialLogin(req, res) {

	emoji_schema.findOne({ "socialId": req.body.socialId }).then(async (data) => {
		if (data) {

			return jwtHandler.genUsrToken({ Phonenumber: data.contactNumber, id: data._id }).then((token) => {
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
					return res.json({ code: userConst.CODES.badRequest, message: userConst.MESSAGES.internalServerError })
				}
				else {
					return res.json({ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.sucessfullyRegister })
				}
			})
		}
	})
}

function cloudinaryImageUploader(req, res) {
	req.newFile_name = [];

	fileUtil.upload(req, res, async function (err) {
		if (err) {
			return res.json({ code: code.badRequest, message: msg.internalServerError })
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
								console.log('error in callback',e)
								return res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.INTRNLSRVRERR });
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
			return res.json({ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.imageUpload ,data:upload})
		}
	});
}

function cloudinaryImageDelete(req, res) {
	emoji_schema.findOne({"_id":req.params.id}).then((data)=>{
		if(data.image==null)
		{
			return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.Noimagefound })	
		}
		else
		{
			emoji_schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { image: null } }, { new: true }).then((result) => {

				return res.json({ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.imageDeleteSucess })
			})
		}
	}).catch(err => { res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.internalServerError }) })
	
}


module.exports =
	{

		register,
		verifyPin,
		resendPin,
		login,
		forgotPassword,
		changePassword,
		editProfile,
		socialLogin,
		cloudinaryImageUploader,
		cloudinaryImageDelete

	}