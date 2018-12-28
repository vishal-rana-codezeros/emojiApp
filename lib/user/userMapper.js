async function loginResponse(data, jwtToken) {
    let newObj = {
        _id: data._id,
        fullName: data.fullName,
        userName: data.userName,
        emailId: data.emailId,
        contactNumber: data.contactNumber,
        image: data.image,
        isVerify: data.isVerify
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
        responseCode: 200,
        responseMessage: 'Successfull Registration'
    }
}
module.exports = {
    loginResponse,
    registerResponse
}