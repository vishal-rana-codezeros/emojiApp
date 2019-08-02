const message = {

    getUserData:'Sucess',
    editSuccess: 'Succesfully Edited',
    internalServerError: 'Internal Server Error',
    deleteUser:'User Deleted',
    tokenNotPrvided: 'Please provide token.',
    inValidToken: "Invalid access.please login again",

};

const code = {
    SUCCESS: 200,
    BADREQUEST: 400,
    FORBIDDEN: 403,
    NOTFOUND: 404,
    INTERNALSERVER: 500,
 

};


module.exports ={
    MESSAGE:message,
    CODE:code

}