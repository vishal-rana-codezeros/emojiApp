const adminconst = require('./adminconstants')
const jwtHndlr = require('../jwtHandlers');

function verifyToken(req, res, next) {

	var token = req.headers['authorization'];

	if (!token) {
		return res.json({ code: adminconst.CODE.BADREQUEST, message: adminconst.MESSAGE.tokenNotPrvided })
	}
	else {
		jwtHndlr.verifyAdminToken(token).then((result) => {

			if (result) {
				next();
			} else {
				return res.json({ code: adminconst.CODE.INTERNALSERVER, message: adminconst.MESSAGE.INTRNLSRVRERR })
			}
		}).catch(err => { return res.json({ code: adminconst.CODE.BADREQUEST, message: adminconst.MESSAGE.inValidToken }) })
	}
}

module.exports = {
	verifyToken,
}