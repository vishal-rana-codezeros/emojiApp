
http_codes = { 
	ok: 200,
	created: 201, 
	badRequest: 400, 
	forbidden:403,
	notFound: 404, 
	internalError: 500, 
	notImplemented: 501, 
	} 

message =
{
	sucessfullyRegister:"Registered sucessfully",
	pinVerifieldSucessfully:"PIN veryfield sucessfully",
	sucessfullyLogin:"Login sucesssfully",
	passwordUpdatedSucessfullly:"Password updated sucessfullly",
	emailAlreadyRegistered: 'Email-id already registered',
	pinResendedsucessfully:'Pin sended Ssucessfully ',
	registered: 'Successfully registered', 
	loggedIn: 'Successfully logged-In', 
	invalidPassword: 'Invalid password', 
	invalidBody:'Invalid data',
	incorrectEmailid:'Incorrect email-id',
	incorrectPassword:'Incorrect password',
	errorIntoTemplateCreatation:"Error occur while creating template ",
	ok:'Ok',
	pinVerifieldfailure:"Please enter valid pIN",
	inValidToken:"Invalid Token",
	errorInUserRegistration:"Error Into registration",
	internalServerError: 'Internal server error', 
	errorInPinVerification:"Unable to verify pin",
	errorInResendPin:"Unable to resend pin",
	emailIdNotExits:"Unauthorized user",
	errorInChangePassword:"Incorrect oldpassword ",
	emailIdNotFound:'EmailId not found',
	provideToken:'Please provide token',
	imgageUpload:'Profile photo uploaded',
	imgageUpdated:'Profile photo updated',
	imageDeleted:'profile photo removed'

}




module.exports=
{
	http_codes,
    message,
}

