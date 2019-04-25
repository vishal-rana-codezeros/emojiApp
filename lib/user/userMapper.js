const userConst = require('./userConstants')
// async function loginResponse(data, jwtToken) {
//     let newObj = {
//         _id: data._id,
//         fullName: data.fullName,
//         userName: data.userName,
//         emailId: data.emailId,
//         contactNumber: data.contactNumber,
//         image: data.image,
//         isVerify: data.isVerify,
//         role: data.role
//     }
//     var respObj = {
//         'responseCode': 200,
//         'responseMessage': 'Login Successfull',
//         userObj: newObj,
//         token: jwtToken,
//         status: true
//     }
//     return respObj
// }

async function loginResponse(data, jwtToken, pin) {
    let newObj = {
        userId: data._id,
        userName: data.userName,
        fullName: data.fullName,
        email: data.emailId,
        phoneNumber: data.contactNumber,
        isdCode: data.isdCode,
        displayImage: data.image
    }
    var respObj = {
        status: true,
        statusCode: 1,
        message: userConst.MESSAGES.sucessfullyLogin,
        data: newObj,
        token: jwtToken,
        pin: pin
    }
    return respObj
}

async function registerResponse(data, jwtToken, pin) {

    let newObj = {
        userId: data._id,
        userName: data.userName,
        fullName: data.fullName,
        email: data.emailId,
        phoneNumber: data.contactNumber,
        isdCode: data.isdCode,
        displayImage: data.image,
    }

    var respObj = {
        status: true,
        statusCode: 1,
        message: userConst.MESSAGES.registerSuccess,
        data: newObj,
        token: jwtToken,
        pin: pin
    }
    return respObj
}

async function verifyAccountResponse() {
    var respObj = {
        status: false,
        statusCode: 0,
        message: userConst.MESSAGES.errorInVerifyAccount,
        data: {}

    }
    return respObj
}

async function checkEmailExistResponse(result) {
    var respObj = {
        status: true,
        statusCode: 1,
        message: "Emailid Exist",
        data: { emailExits: true }
    }
    return respObj
}

async function checkEmailNotExistResponse(result) {

    var respObj = {
        status: fail,
        statusCode: 0,
        message: userConst.MESSAGES.userNotExists,
        data: { emailExits: false }
    }
    return respObj
}

async function checkNumberExistResponse(result) {

    var respObj = {
        status: true,
        statusCode: 1,
        message: 'Number Exist',
        data: { numberExits: true }
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
    incorrectPwd,
    checkEmailExistResponse,
    checkEmailNotExistResponse,
    checkNumberExistResponse

}