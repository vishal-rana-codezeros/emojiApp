const messages = {
  sucessfullyRegister: "Registered sucessfully",
  pinVerifieldSucess: "PIN verified sucessfully",
  sucessfullyLogin: "Login sucesssfully",
  passwordUpdatedSucess: "Password reset sucessfullly",
  emailAlreadyRegistered: 'User already exists.',
  pinSentsucess: 'Pin sent Sucessfully ',
  invalidPassword: 'Invalid password',
  invalidBody: "Please provide all the required fields.",
  incorrectEmailid: 'User Not Found.',
  invalidPin: "Invalid Pin",
  inValidToken: "Invalid Token",
  internalServerError: 'Internal Server Error',
  imageUpload: 'Image Uploaded Successfully',
  errorInVerifyAccount: 'Please verify your account',
  editSuccess: 'Succesfully Edited',
  tokenNotPrvided: "Please provide token.",
  alreadyVerified: "Your account has been already verified.",
  imageDeleteSucess: "Image removed successfully",
  Noimagefound: "No image found"
};

const codes = {
  SUCCESS: 200,
  BADREQUEST: 400,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  INTRNLSRVRERR: 500,
}

const mailObj = {
  apiKey: 12345,
  apiSecret: 123,
  regiterMailSubject: 'Welcome to Emoji App',
  forgotPasswordMailSubject: 'Forgot Password'

}

const cloudinary = {
  cloud_name: 'yunu121',
  api_key: '579755252783132',
  api_secret: 'uRQjHh6oz--PCimbyB87XztRm68'
}

const hostMailDetails = {
  host: 'smtp.gmail.com',
  port: 465,
}

module.exports = {
  MESSAGES: messages,
  CODES: codes,
  MAILOBJ: mailObj,
  CLOUDINARY: cloudinary,
  HOSTMAILDETAILS: hostMailDetails
}

