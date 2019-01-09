const message = {

    getUserData: 'Sucess',
    editSuccess: 'Edited Successfully',
    internalServerError: 'Internal Server Error',
    deleteUser: 'User Deleted',
    tokenNotPrvided: 'Please Provide Token.',
    inValidToken: "Invalid Access Please Login Again",
    totalRecords: "Total records are",
    maleUserRecords: "Count of Male user's records are",
    femaleUserRecords: "Count of female user's records  are",
    noRecordsFound: "No Such User Found",
    activeUser: "User Activated Successfully",
    invaliduser: "Invalid user",
    addCmsPage: "Successfully Added",
    aboutusAlredyAdded: "Already added",
    keyboardadded: 'Added Sucessfully',
    requireField: 'Please provide all required field',
    keyboardAlreadyRegistered: 'keyboardName already exits',
    invalidData: 'invalid request',
    categoryAdded:'Added Sucessfully',
    CategoryDelete:'Successfully Deleted',
    catActivate:'Activated Successfully',
    catAlreadyRegistered:'Alredy Added',
    noDataFound:"No Data Found",
    categoryAlreadyRegistered:'Already Added'
};

const code = {
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