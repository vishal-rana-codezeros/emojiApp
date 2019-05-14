
async function loginResponse(data, jwtToken) {
    let newObj = {
        _id: data._id,
        fullName: data.fullName,
        userName: data.userName,
        emailId: data.emailId,
        contactNumber: data.contactNumber,
        image: data.image,
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

async function allowCMSFields(req) {

    let obj = {
        'type': "aboutUs",
        'createdBy': req.params.id,
        'description': req.body.description,
    }
    return obj
}

async function allowKeyboardFields(req) {

    let obj = {
        'keyboardName': req.body.keyboardName,
        'categoryName': req.body.categoryName,
        'keyboardType': req.body.keyboardType,
        'cost': req.body.cost,
        'image': req.body.image,

    }
    return obj
}

async function allowprivacy_policyFields(req) {

    let obj = {
        'type': "privacy_policy",
        'createdBy': req.params.id,
        'description': req.body.description,
    }
    return obj
}

async function allow_terms_conditions(req) {

    let obj = {
        'type': "terms_conditions",
        'createdBy': req.params.id,
        'description': req.body.description,
    }
    return obj
}


module.exports = {
    loginResponse,
    allowCMSFields,
    allowKeyboardFields,
    allowprivacy_policyFields,
    allow_terms_conditions

}