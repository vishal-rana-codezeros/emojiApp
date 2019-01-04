const message = {

    getUserData: 'Sucess',
    editSuccess: 'Succesfully Edited',
    internalServerError: 'Internal Server Error',
    deleteUser: 'User Deleted',
    tokenNotPrvided: 'Please provide token.',
    inValidToken: "Invalid access.please login again",
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
    CategoryDelete:'Category Deleted',
    catActivate:'Activated Sucessfully'
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