const messages = {
  sucessfullyRegister: "Registered sucessfully",
  pinVerifieldSucess: "PIN verified sucessfully",
  sucessfullyLogin: "Login sucesssfully",
  passwordUpdatedSucess: "Password reset sucessfullly",
  forgetPasswordMail:"Mail sent Sucessfully",
  emailAlreadyRegistered: 'User already exists.',
  pinSentsucess: 'Pin sent Sucessfully ',
  invalidPassword: 'Incorrect password',
  invalidBody: "Please provide all the required fields.",
  incorrectEmailid: 'User not found.',
  invalidPin: "Invalid pin",
  inValidToken: "Invalid access.please login again",
  internalServerError: 'Internal server error',
  imageUpload: 'Image uploaded successfully',
  errorInVerifyAccount: 'Please verify your account',
  editSuccess: 'Succesfully edited',
  tokenNotPrvided: "Please provide token.",
  alreadyVerified: "Your account has been already verified.",
  imageDeleteSucess: "Image removed successfully",
  Noimagefound: "No image found",
  WELCOME: 'Welcome to Emoji App',
  Forgotpassword:'Forgot password'
};

const codes = {
  SUCCESS: 200,
  BADREQUEST: 400,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  INTRNLSRVRERR: 500,
}

const mailObj = {
  apiKey: process.env.apiKey,
  apiSecret:process.env.apiSecret,
  regiterMailSubject: messages.WELCOME,
  forgotPasswordMailSubject: messages.Forgotpassword

}

const cloudinary = {
  cloud_name: process.env.cloud_name,
	api_key: process.env.api_key,
	api_secret:process.env.api_secret
}



module.exports = {
  MESSAGES: messages,
  CODES: codes,
  MAILOBJ: mailObj,
  CLOUDINARY: cloudinary,

}

