
async function loginResponse(data, jwtToken) {
    let newObj = {
        _id: data._id,
        fullName: data.fullName,
        userName: data.userName,
        emailId: data.emailId,
        contactNumber: data.contactNumber,
        image: data.image,
    }
    var respObj = {
        'responseCode': 200,
        'responseMessage': 'Login Successfull',
        userObj: newObj,
        token: jwtToken
    }

    return respObj
}

module.exports = {
    loginResponse

}