const message = {

    getUserData: 'Success',
    editSuccess: 'Edited Successfully',
    internalServerError: 'Internal Server Error',
    deleteUser: 'User Deleted Successfully',
    tokenNotPrvided: 'Please Provide Token.',
    inValidToken: "Invalid Access Please Login Again",
    maleUserRecords: "Count Of Male User's Records Are",
    femaleUserRecords: "Count Of Female User's Records  Are",
    userNotFound: "User Not Found",
    activeUser: "User Activated Successfully",
    invaliduser: "Invalid User",
    addCmsPage: "Successfully Added",
    aboutusAlredyAdded: "Already Added",
    keyboardadded: 'Added Sucessfully',
    requireField: 'Please Provide All Required Field',
    keyboardAlreadyRegistered: 'keyboardname Already Exits',
    invalidData: 'Invalid Request',
    categoryAdded: 'Added Sucessfully',
    CategoryDelete: 'Deleted Successfully ',
    catActivate: 'Activated Successfully',
    catAlreadyRegistered: 'Alredy Added',
    noDataFound: "No Data Found",
    categoryAlreadyRegistered: 'Already Added',
    activeKeyboard: 'Activated Successfully',
    inactiveKeyboard: 'Deleted Successfully',
    paidcost: 'Please add cost for paid service',
    pageNotFound:'Page Not Found'

};

const code = {
    FAILURECASE: 0,
    SUCCESSCASE: 1,
    SUCCESS: 200,
    BADREQUEST: 400,
    FORBIDDEN: 403,
    NOTFOUND: 404,
    INTERNALSERVER: 500,
};

module.exports = {
    MESSAGE: message,
    CODE: code

}