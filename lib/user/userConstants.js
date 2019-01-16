const messages = {
  sucessfullyRegister: "Registered sucessfully",
  pinVerifieldSucess: "Verified Sucessfully",
  sucessfullyLogin: "Login Sucesssfully",
  passwordUpdatedSucess: "Password Changed Successfullly",
  forgetPasswordMail: "Mail Sent Sucessfully",
  emailAlreadyRegistered: 'User Already Exists.',
  pinSentsucess: 'Pin Sent Sucessfully ',
  invalidPassword: 'You have entered an invalid username or password',
  invalOldPwd: 'You have entered an incorrect password',
  invalidBody: "Please provide all the required fields.",
  incorrectEmailid: 'You have entered an invalid username or password',
  invalidPin: 'Invalid Pin',
  inValidToken: "Invalid Access Please Login Again",
  internalServerError: 'Internal Server Error',
  imageUpload: 'Image Uploaded Successfully',
  errorInVerifyAccount: 'Please verify your account',
  editSuccess: 'Succesfully Edited',
  tokenNotPrvided: "Please Provide Token.",
  alreadyVerified: "Your account has been already verified.",
  imageDeleteSucess: "Image Removed Successfully",
  Noimagefound: "No Image Found",
  WELCOME: 'Welcome to Emoji App',
  Forgotpassword: 'Forgot Password',
  userDetails: 'User Details',
  incorrectid: "User Not Found",
  errorInSendMaill: "Unable to send Mail"

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
  apiSecret: process.env.apiSecret,
  regiterMailSubject: messages.WELCOME,
  forgotPasswordMailSubject: messages.Forgotpassword

}

const cloudinary = {
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
}



module.exports = {
  MESSAGES: messages,
  CODES: codes,
  MAILOBJ: mailObj,
  CLOUDINARY: cloudinary,

}

