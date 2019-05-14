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
        contactNumber: data.contactNumber,
        isdCode: data.isdCode,
        displayImage: data.image
    }
    var respObj = {
        status: true,
        statusCode: userConst.CODES.SUCCESSCASE,
        message: userConst.MESSAGES.sucessfullyLogin,
        data: newObj,
        token: jwtToken,
        pin: pin
    }
    return respObj
}

async function registerResponse(data, jwtToken, Password) {
    let newObj = {
        userId: data._id,
        userName: data.userName,
        fullName: data.fullName,
        email: data.emailId,
        contactNumber: data.contactNumber,
        isdCode: data.isdCode,
        displayImage: data.image,

    }

    var respObj = {
        status: true,
        statusCode: userConst.CODES.SUCCESSCASE,
        message: userConst.MESSAGES.registerSuccess,
        data: newObj,
        token: jwtToken,
        pin: Password
    }
    return respObj
}

async function verifyAccountResponse() {
    var respObj = {
        status: false,
        statusCode: userConst.CODES.FAILURECASE,
        message: userConst.MESSAGES.errorInVerifyAccount,
        data: {}

    }
    return respObj
}

async function checkEmailExistResponse(result) {
    var respObj = {
        status: true,
        statusCode: userConst.CODES.SUCCESSCASE,
        message: userConst.MESSAGES.emailExits,
        data: { emailExits: true }
    }
    return respObj
}

async function checkEmailNotExistResponse(result) {

    var respObj = {
        status: false,
        statusCode: userConst.CODES.FAILURECASE,
        message: userConst.MESSAGES.userNotExists,
        data: { emailExits: false }
    }
    return respObj
}

async function editProfileEmailCheck(result) {
    var respObj = {
        status: false,
        statusCode: userConst.CODES.FAILURECASE,
        message: userConst.MESSAGES.emailExits,
        data: { emailExits: true }
    }
    return respObj
}

async function editProfileNumberCheck(result) {
    var respObj = {
        status: false,
        statusCode: userConst.CODES.FAILURECASE,
        message: userConst.MESSAGES.numExits,
        data: { numberExits: true }
    }
    return respObj
}

async function checkNumberExistResponse(result) {

    var respObj = {
        status: true,
        statusCode: userConst.CODES.SUCCESSCASE,
        message: userConst.MESSAGES.numExits,
        data: { numberExits: true }
    }
    return respObj
}
async function updateProfileFailure(result) {

    var respObj = {
        status: false,
        statusCode: userConst.CODES.FAILURECASE,
        message: userConst.MESSAGES.sameEmailOrNum,

    }
    return respObj
}
function updateProfileSuccess(result) {
    let {
        id,
        fullName,
        emailId,
        gender,
        image,
        userName,
        contactNumber } = result;
    let new_obj = {
        id,
        fullName,
        emailId,
        gender,
        image,
        userName,
        contactNumber
    }
    var respObj = {
        status: true,
        statusCode: userConst.CODES.SUCCESSCASE,
        message: userConst.MESSAGES.editSuccess,
        data: new_obj
    }
    return respObj;
}
function internalServerError() {
    return {
        status: false,
        statusCode: userConst.CODES.FAILURECASE,
        message: userConst.MESSAGES.internalServerError,
        data: {}
    }
}

function userNotFound() {
    return {
        status: true,
        statusCode: userConst.CODES.FAILURECASE,
        message: userConst.MESSAGES.incorrectid,
        data: {}
    }
}

async function incorrectPwd() {
    var respObj = {
        responseCode: userConst.CODES.BADREQUEST,
        responseMessage: userConst.MESSAGES.invalidPassword
    }
    return respObj
}

async function syncContacts() {
    var respObj = {
        contactNumber: "",
        UserId: "",
        name: "",
        exists: true
    }
    return respObj
}
function allowEditProfileFields(obj) {

    let {
        fullName,
        userName
    } = obj;
    let obj1 = {
        fullName, userName
    }
    return obj1

}

async function allowContactUsFields(req) {
    let obj = {
        'subject': req.body.subject,
        'message': req.body.message,
        'submittedBy': req.params.id,
    }
    return obj
}

function cmsResponse(obj) {
    return {
        status: obj.status,
        statusCode: obj.statusCode,
        message: obj.message,
        data: {
            content: obj.data.description
        }
    }
}
module.exports = {
    loginResponse,
    registerResponse,
    verifyAccountResponse,
    incorrectPwd,
    checkEmailExistResponse,
    checkEmailNotExistResponse,
    checkNumberExistResponse,
    updateProfileFailure,
    updateProfileSuccess,
    allowEditProfileFields,
    editProfileEmailCheck,
    editProfileNumberCheck,
    allowContactUsFields,
    cmsResponse,
    internalServerError,
    userNotFound
}