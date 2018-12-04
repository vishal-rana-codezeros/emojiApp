
// load all dependencies
var Promise = require("bluebird");
var jwt = Promise.promisifyAll(require("jsonwebtoken"));
var TOKEN_EXPIRATION_SEC = 24* 60 * 60;
const userConst = require('./user/userConstants');

var genUsrToken = function (user) {
   var options = {expiresIn:TOKEN_EXPIRATION_SEC};
   return jwt.signAsync(user, process.env.user_secret, options)
       .then(function (jwtToken) {
           return jwtToken;
       })
       .catch(function (err) {
           console.log(err)
        return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.internalServerError })
       });
};

var genAdminToken = function (admin) {
   var options = {expiresIn:TOKEN_EXPIRATION_SEC};
   return jwt.signAsync(admin, process.env.admin_secret, options)
       .then(function (jwtToken) {
           return jwtToken;
       })
       .catch(function (err) {
        console.log(err)
        return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.internalServerError })
       });
};

var verifyUsrToken = function (jwtToken) {
   return jwt.verifyAsync(jwtToken, process.env.user_secret)
       .then(function (tokenPayload) {
           this.tokenPayload = tokenPayload;
           return this.tokenPayload ;
       })
       .catch(function (err) {
        console.log(err)
        return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.internalServerError })
       });
};



var verifyAdminToken = function (acsTokn) {
   return jwt.verifyAsync(acsTokn, process.env.admin_secret)
       .then(function (tokenPayload) {
           this.tokenPayload = tokenPayload;
           return tokenPayload;
       })
       .catch(function (err) {
        console.log(err)
        return res.json({ code: userConst.CODES.BADREQUEST, message: userConst.MESSAGES.internalServerError })
       });
};

module.exports = {
   genUsrToken: genUsrToken,
   verifyUsrToken: verifyUsrToken,
   genAdminToken: genAdminToken,
   verifyAdminToken: verifyAdminToken,
};

