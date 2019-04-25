var emoji_schema = require('../schema/emojiapp')
var roomSchema = require('../schema/roomSchema')
var messageSchema = require('../schema/messageSchema')
var securePin = require("secure-pin");
var bcrypt = require('bcrypt');
var util = require('../appUtil')
const userConst = require('./userConstants')
var cloudinary = require('cloudinary');
const fileUtil = require('../middleware/multer_file')
const jwtHandler = require('../jwtHandlers')
const userMapper = require('./userMapper');
const adminMapper = require('../admin/adminMapper')
var userDao = require('./userdao')
cloudinary.config(userConst.CLOUDINARY);


//<--------------------------------------------------------------------Updated Api`s Start from here------------------------------------------------------------------------------------------------------------------------------------------------------------>

async function register(req, res) {
	return emoji_schema.findOne({ $or: [{ "emailId": req.body.emailId }, { "contactNumber": req.body.contactNumber }] }).then(async (result) => {
		if (result) {
			return { status: false, code: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.sameEmailOrNum }
		}
		else {
			console.log("into registeration")
			let obj = req.body;

			return userDao.registerUser(obj).then(async (data) => {

				return userMapper.registerResponse(data).then((resp) => {

					return resp

				}).catch(err => { return { status: false, code: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.internalServerError } })

			}).catch(err => {

				return { status: false, code: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.registerFailure }
			})
		}
	}).catch(err => { return { status: false, code: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.internalServerError } })
}

async function login(req, res) {

	return emoji_schema.findOne({ $or: [{ "emailId": req.body.emailId }, { "contactNumber": req.body.contactNumber }] }).then(async (data) => {

		if (data) {
			if (data.role == 'ADMIN') {
				const match = await bcrypt.compare(req.body.password, data.password);

				if (match) {

					return jwtHandler.genAdminToken({ id: data._id }).then((jwt) => {

						return adminMapper.loginResponse(data, jwt).then((resp) => {

							return resp

						}).catch(err => { return { code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError } })
					}).catch(err => { return { code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.gentoknfailure } })
				}
				else {
					return { code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.invalidPassword }
				}
			}
			else if (data.role == 'USER') {
				if (req.body.emailId) {
					let id = req.body.emailId
					return userDao.getUser(id).then(async (data) => {
						if (!data) {
							return { status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.incorrectEmailid, data: {} }
						}
						else {
							var Password = securePin.generatePinSync(6);
							let html = `Verify Your Account Using This OTP :-</b><h1>${Password}</h1>`
							await util.sendMail(data.emailId, userConst.MAILOBJ.regiterMailSubject, html)
							newPin = bcrypt.hashSync(Password, 10);

							let id = req.body.emailId
							let obj = {}
							obj.pin = newPin
							obj.pin = newPin

							return userDao.updateData1(id, obj).then((result1) => {

								return jwtHandler.genUsrToken({ id: data._id }).then((jwt) => {

									return userMapper.loginResponse(data, jwt).then((resp) => {

										return resp
									}).catch(err => { return { status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.internalServerError, data: {} } })
								}).catch(err => { return { status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.gentoknfailure, data: {} } })
							}).catch(err => { return ({ status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.internalServerError, data: {} }) })
						}
					}).catch(err => { return ({ status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.internalServerError, data: {} }) })
				}
				else {

					let id = req.body.contactNumber
					let id1 = req.body.isdCode
					return userDao.getUserContactNum(id, id1).then(async (data) => {

						if (!data) {
							return { status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.incorrectContactAndISD, data: {} }
						}
						else {

							var Password = securePin.generatePinSync(6);

							let msgBody = `verify Your Account Using This Pin:- ${Password}`;

							await util.sendMessage(msgBody, req.body.contactNumber);
							newPin = bcrypt.hashSync(Password, 10);

							let id = req.body.contactNumber
							let obj = {}
							obj.pin = newPin

							return userDao.updateData2(id, obj).then((result1) => {
								return jwtHandler.genUsrToken({ id: data._id }).then((jwt) => {

									return userMapper.loginResponse(data, jwt).then((resp) => {

										return resp
									}).catch(err => { return { status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.internalServerError, data: {} } })
								}).catch(err => { return { status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.gentoknfailure, data: {} } })
							}).catch(err => { return ({ status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.internalServerError, data: {} }) })
						}
					}).catch(err => { return ({ status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.internalServerError, data: {} }) })
				}
				// }
				// else {

				// 	return userMapper.verifyAccountResponse().then((resp) => { return resp })
				// 		.catch(err => { return { status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.incorrectEmailid, data: {} } })
				// }
			}
		}
		else {
			return { status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.incorrectEmailid, data: {} }
		}
	}).catch(err => { return { status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.incorrectEmailid, data: {} } })
}


async function checkEmailExist(req, res) {

	return emoji_schema.findOne({ "emailId": req.body.emailId, status: "ACTIVE" }).then(async (result) => {

		if (result) {

			return userMapper.checkEmailExistResponse(result).then((resp) => {

				return resp

			}).catch(err => { return { code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError } })
		}
		else {
			return { status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.userNotExists, data: { emailExits: false } }
		}

	}).catch(err => { return { status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.internalServerError, data: {} } })
}

async function checkNumberExist(req, res) {

	return emoji_schema.findOne({ $and: [{ "contactNumber": req.body.contactNumber }, { "isdCode": req.body.isdCode }] }).then(async (result) => {


		if (result) {

			return userMapper.checkNumberExistResponse(result).then((resp) => {

				return resp

			}).catch(err => { return { code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError } })
		}
		else {
			return { status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.numNotExits, data: { numberExits: false } }
		}

	}).catch(err => { return { status: false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.internalServerError, data: {} } })
}

function imageUpload(req, res) {

	req.newFile_name = [];
	fileUtil.upload(req, res, async function (err) {
		if (err) {
			return res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError })
		}
		else {
			return res.json({ status: true, statusCode: userConst.CODES.SUCCESSCASE, message: userConst.MESSAGES.imageUpload, data: req.newFile_name })
		}
	});
}

function syncContacts(req, res) {

	return emoji_schema.findOne({ "contactNumber": req.body.contacts["contactNumber"] }).then((result) => {
		let result1  = req.body
		console.log("into function", result1)
	})
}

//<--------------------------------------------------------------------Updated Api`s ended------------------------------------------------------------------------------------------------------------------------------------------------------------>



function forgotPassword(req, res) {
	let id = req.body.emailId
	return userDao.getUser(id).then(async (data) => {
		if (!data) {
			return { code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.incorrectid }
		}
		else {
			var Password = securePin.generatePinSync(6);
			let html = `We received a request to reset your EmojiApp password. Your new password is  :-</b><h1>${Password}</h1>`
			await util.sendMail(data.emailId, userConst.MAILOBJ.forgotPasswordMailSubject, html)
			data.password = bcrypt.hashSync(Password, 10);
			let id = req.body.emailId
			let obj = {}
			obj.password = data.password
			return userDao.updateData1(id, obj).then((result1) => {
				return { code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.forgetPasswordMail }
			}).catch(err => { return ({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError }) })
		}
	}).catch(err => { return ({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError }) })
}


async function inviteUser(req, res) {

	let msgBody = `follow this invitation link to use EmojiApp: - `;
	util.sendMessage(msgBody, req.body.contactNumber).then((data) => {

		return res.josn({ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.SUCCESS })

	}).catch(err => { return res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError }) })

}


async function resendPin(req, res) {

	var newPin = securePin.generatePinSync(4);
	let id = req.params.id
	return userDao.getUserData(id).then(async (data) => {
		if (data) {
			if (data.isVerify == true) {
				return { code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.verifiedAccountExists }
			}
			else {

				let msgBody = `Please verify Your Account Using This Pin :- ${newPin}`
				await util.sendMessage(msgBody, data.contactNumber)
				let html = `<b>Please verify Your Account Using This Pin:-</b><h3>${newPin}</h3>`
				await util.sendMail(data.emailId, userConst.MAILOBJ.regiterMailSubject, html)

				let id = req.params.id
				let obj = {}
				obj.pin = newPin
				return userDao.updateData(id, obj).then((body) => {
					return { code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.pinSentsuccess }
				})
			}
		}
		else {
			return { code: userConst.CODES.NOTFOUND, message: userConst.MESSAGES.incorrectid }
		}
	}).catch(err => { return ({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError }) })
}


function verifyAccount(req, res) {
	let id = req.params.id
	return userDao.getUserData(id).then((result) => {
		if (result) {
			if (result.isVerify == true) {
				return { code: userConst.CODES.FORBIDDEN, message: userConst.MESSAGES.verifiedAccountExists }
			}
			else if (req.body.pin == result.pin) {
				let id = req.params.id
				let obj = {}
				obj.isVerify = "true"
				return userDao.updateData(id, obj).then((data) => {
					return { code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.VerifieldSuccess }
				})
			}
			else {
				return { code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.VerifieldFailure }
			}
		}
		else {
			return { code: userConst.CODES.NOTFOUND, message: userConst.MESSAGES.incorrectid }
		}
	}).catch(err => { return { code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError } })
}


function changePassword(req, res) {
	let id = req.params.id
	return userDao.getUserData(id).then((result) => {
		if (result) {
			return bcrypt.compare(req.body.oldPassword, result.password).then((result1) => {
				if (result1) {
					var newpass = bcrypt.hashSync(req.body.newPassword, 10);
					let obj = {}
					obj.password = newpass
					return userDao.updateData(id, obj).then((result2) => {
						if (result2) {
							return { code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.passwordUpdatedSucess }
						} else {
							return { code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError }
						}
					})
				}
				else {
					return { code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.invalOldPwd }
				}
			})
		}
		else {
			return { code: userConst.CODES.NOTFOUND, message: userConst.MESSAGES.incorrectid }

		}
	})
}


function editProfile(req, res) {
	let id = req.params.id
	let obj = req.body
	return userDao.updateData(id, obj).then((data) => {
		if (data) {
			return { code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.editSuccess }
		}
		else {
			return { code: userConst.CODES.NOTFOUND, message: userConst.MESSAGES.incorrectid }
		}
	}).catch(err => { return ({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError }) })
}


function socialLogin(req, res) {
	var pin = securePin.generatePinSync(4);
	let id = req.body.socialId
	return userDao.socialId(id).then((data) => {

		if (!data) {
			let obj = req.body;

			return userDao.registerUser(obj).then(async (data1) => {

				let msgBody = `Please verify Your Account Using This Pin:- ${pin}`;
				await util.sendMessage(msgBody, req.body.contactNumber);

				let html = `<b> Please verify Your Account Using This Pin:-</b><h1>${pin}</h1>`;
				await util.sendMail(req.body.emailId, userConst.MAILOBJ.regiterMailSubject, html);

				return { code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.registerSuccess }

			}).catch(err => {
				return { code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.registerFailure }
			})
		}
		else {
			return jwtHandler.genUsrToken({ id: data._id }).then((jwt) => {

				return userMapper.loginResponse(data, jwt).then((resp) => {

					return resp

				}).catch(err => { return { code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError } })
			}).catch(err => { return { code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.gentoknfailure } })
		}
	})
}
// <-----------------------------------------------------------------Socket--------------------------------------------------------------------------------------------------------->

// async function getUserDetails(req, res) {
// 	console.log("into userService")
// 	return emoji_schema.findOne({ role: "USER", _id: { $exists: true, $ne: [req.params.id] } }, (err, data) => {

// 		if (err) {
// 			return { code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError }
// 		}
// 		else {
// 			console.log("fsdf",{ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.userDetails, result: data })
// 			return { code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.userDetails, result: data }

// 		}
// 	})
// }


async function getUserDetails(req, res) {
	console.log("into getUserDetails")
	return emoji_schema.findOne({ role: "USER", _id: { $exists: true, $ne: [req.params.id] } }).then((data) => {
		console.log("into getUserDetails", data)
		if (!data) {
			return res.json({ code: userConst.CODES.NOTFOUND, message: userConst.MESSAGES.noDataFound, result: data })
		}
		else {
			return res.json({ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.userDetails, result: data })
		}
	}).catch(err => { ({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError }) })
}
//  function getUserDetails(req, res) {
// 	console.log("into getUserDetails")
// 	return emoji_schema.findOne({ role: "USER", _id: { $exists: true, $ne: [req.params.id] } }), ((err, data) => {
// 		if (err) {
// 			return res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError })
// 		}
// 		else {
// 			console.log("into get user data",data)
// 			return res.json({ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.userDetails, result: data })
// 		}
// 	})
// }
function getChatDetails(req, res) {
	messageSchema.find({ roomId: req.params.id }).populate('senderId', ['userName']).exec(function (err, data) {
		if (err) {
			return res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError })
		}
		else {
			return res.json({ code: userConst.CODES.SUCCESS, message: userConst.MESSAGES.userDetails, data: data })
		}
	})
}
function groupData(req, res) {
	console.log(req.params.id)
	roomSchema.find({ chatType: "group", participants: { $in: [req.params.id] } }).then((data) => {
		return res.json({ code: 200, message: "ok", data: data })
	}).catch((err) => {
		return res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.internalServerError })
	})
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
		getUserDetails,
		getChatDetails,
		groupData,
		inviteUser,
		checkEmailExist,
		checkNumberExist,
		syncContacts

	}