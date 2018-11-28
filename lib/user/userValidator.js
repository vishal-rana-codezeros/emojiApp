var jwt = require('jsonwebtoken');
var secret = 'this_is-a-secret'
var code = require("../responseHandler.js").http_codes
var msg = require("../responseHandler.js").message


async function verifyToken(req, res, next) {
	if (!req.headers.authorization) {
		return res.json({  code: code.badRequest,message:msg.provideToken})
	}
	else {
		jwt.verify(req.headers['authorization'], secret, function (err, decoded) {
			if (err) {
				return res.json({ code: code.badRequest, message: msg.inValidToken })
				}
			else {
				next();
			}
		})
	}
}

function validateSignUp(req, res, next) {
	if (req.body.userName && req.body.fullName && req.body.contactNumber && req.body.emailId && req.body.password) {
		req.body.userName = req.body.userName.trim(),
			req.body.fullName = req.body.fullName.trim(),
			req.body.contactNumber = req.body.contactNumber.trim(),
			req.body.emailId = req.body.emailId.trim(),
			req.body.password = req.body.password.trim();
		if (req.body.userName && req.body.fullName && req.body.contactNumber && req.body.emailId && req.body.password) {
			next();
		}
		else {
			return res.json({ code: code.badRequest, message: msg.invalidBody })
		}
	}

}

function validateVeryfyPin(req, res, next) {
	if (req.body.pin) {
		// req.body.Pin = req.body.Pin.trim();

		if (req.body.pin) {
			next();
		}
		else {
			return res.json({ code: code.badRequest, message: msg.invalidBody })
		}
	}
}

function ValidateLogin(req, res, next) {
	console.log("into ValidateLogin")
	if (req.body.emailId && req.body.password) {
		req.body.emailId = req.body.emailId.trim(),
			req.body.password = req.body.password.trim();
		if (req.body.emailId && req.body.password)  {
			next();
		}
		else {
			return res.json({ code: code.badRequest, message: msg.invalidBody })
		}
	}
}

// function ValidateLogin(req, res, next) {
// 	console.log("into ValidateLogin")
// 	if (req.body.emailId && req.body.password &&  req.body.contactNumber) {
// 		req.body.emailId = req.body.emailId.trim(),
// 			req.body.password = req.body.password.trim();
// 			req.body.contactNumber = req.body.contactNumber.trim();
// 		if (req.body.emailId && req.body.password &&  req.body.contactNumber)  {
// 			next();
// 		}
// 		else {
// 			return res.json({ code: code.badRequest, message: msg.invalidBody })
// 		}
// 	}
// }

function validateForgotPassword(req, res, next) {
	if (req.body.emailId) {
		req.body.emailId = req.body.emailId.trim()

		if (req.body.emailId) {
			console.log("next----------")
			next();
		}
		else {
			return res.json({ code: code.badRequest, message: msg.invalidBody })
		}
	}
}

function validatechangePassword(req, res, next) {
	if (req.body.oldPassword || req.body.newPassword) {
		req.body.oldPassword = req.body.oldPassword.trim(),
			req.body.newPassword = req.body.newPassword.trim();

		if (req.body.oldPassword && req.body.newPassword) {
			next();
		}
		else {
			return res.json({ code: code.badRequest, message: msg.invalidBody })
		}
	}

}

module.exports = {
	verifyToken,
	validateSignUp,
	validateVeryfyPin,
	ValidateLogin,
	validateForgotPassword,
	validatechangePassword

}

