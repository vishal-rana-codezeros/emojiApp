const userConst = require('./userConstants')
async function loginResponse(data, jwtToken) {
    let newObj = {
        _id: data._id,
        fullName: data.fullName,
        userName: data.userName,
        emailId: data.emailId,
        contactNumber: data.contactNumber,
        image: data.image,
        isVerify: data.isVerify,
        role:data.role
    }
    var respObj = {
        'responseCode': 200,
        'responseMessage': 'Login Successfull',
        userObj: newObj,
        token: jwtToken
    }

    return respObj
}
async function registerResponse() {
    return {
        responseCode: userConst.CODES.SUCCESS,
        responseMessage: userConst.MESSAGES.sucessfullyRegister
    }
}

async function verifyAccountResponse() {
    var respObj = {
        responseCode: userConst.CODES.FORBIDDEN,
        responseMessage: userConst.MESSAGES.errorInVerifyAccount
    }
    return respObj
}

async function incorrectPwd() {
    var respObj = {
        responseCode: userConst.CODES.BADREQUEST,
        responseMessage: userConst.MESSAGES.invalidPassword
    }
    return respObj
}

module.exports = {
    loginResponse,
    registerResponse,
    verifyAccountResponse,
    incorrectPwd
}