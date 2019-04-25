const userConst = require('./userConstants');
const jwtHndlr = require('../jwtHandlers');
var FormData = require('form-data');
var fs = require('fs');
//<---------------------------------------------------------------Updated Api`s validator start from here------------------------------------------------------------------------------------------------------------------------------>

function validateSignUp(req, res, next) {

	let { userName, fullName, emailId, contactNumber, isdCode, deviceType, deviceId, fcmToken, } = req.body;

	if (userName && fullName && emailId && contactNumber && isdCode && deviceType && deviceId && fcmToken) {
		next();
	} else {
		return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.invalidBody })
	}
}


function ValidateLogin(req, res, next) {
	if (req.body.emailId || ((req.body.contactNumber && req.body.isdCode))) {
		next();
	}
	else {
		return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.invalidBody })
	}
}


function ValidateNumberExist(req, res, next) {

	if (req.body.contactNumber && req.body.isdCode) {
		next();
	}
	else {
		return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.invalidBody })
	}
}


function verifyToken(req, res, next) {
	var token = req.headers['authorization'];

	if (!token) {
		return res.json({status:false, statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.tokenNotPrvided,data:{} })
	}
	else {
		jwtHndlr.verifyUsrToken(token).then((result) => {
			if (result) {
				next();
			} else {
				return res.json({ status:false,statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.internalServerError,data:{} })
			}
		}).catch(err => { return res.json({status:false,statusCode: userConst.CODES.FAILURECASE, message: userConst.MESSAGES.inValidToken,data:{} }) })
	}
}




//<---------------------------------------------------------------Updated Api`s validator Ended------------------------------------------------------------------------------------------------------------------------------>


function validateverifyAccount(req, res, next) {
	if (req.body.pin) {
		next();
	}
	else {
		return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.invalidBody })
	}
}

function validateForgotPassword(req, res, next) {

	if (req.body.emailId) {
		next();
	}
	else {
		return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.invalidBody })
	}
}
function validatechangePassword(req, res, next) {

	if (req.body.oldPassword && req.body.newPassword) {
		next();
	}
	else {
		return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.invalidBody })
	}
}


module.exports = {
	verifyToken,
	validateSignUp,
	validateverifyAccount,
	ValidateLogin,
	validateForgotPassword,
	validatechangePassword,
	ValidateNumberExist
}

