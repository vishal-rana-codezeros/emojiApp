const userConst = require('./userConstants');
const jwtHndlr = require('../jwtHandlers');

//====================================================================================================================================================


function verifyToken(req, res, next) {

	var token = req.headers['authorization'];

	if (!token) {
		return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.tokenNotPrvided })
	}
	else {
		jwtHndlr.verifyUsrToken(token).then((result) => {

			if (result) {
				next();
			} else {
				return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.internalServerError })
			}
		}).catch(err => { return res.json({ code: userConst.CODES.INTRNLSRVRERR, message: userConst.MESSAGES.inValidToken }) })
	}
}

function validateSignUp(req, res, next) {
	let { userName, fullName, contactNumber, emailId, password, deviceType, deviceToken } = req.body;

	if (userName && fullName && contactNumber && emailId && password && deviceType && deviceToken) {
		next();
	} else {
		return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.invalidBody })
	}
}

function validateverifyAccount(req, res, next) {
	if (req.body.pin) {
		next();
	}
	else {
		return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.invalidBody })
	}
}

function ValidateLogin(req, res, next) {

	if (req.body.emailId || req.body.contactNumber && req.body.password) {
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
	validatechangePassword

}

