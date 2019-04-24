const messages = {
  userExists: 'User Exists',
  sameEmailOrNum: 'User Exists with This Emailid Or ContactNumber',
  userNotExists:'Emaild Not Exist',
  registerSuccess: 'Register Successfully',
  mailFailure: 'An Error Occurred While Sending Mail',
  registerFailure: 'An Error Occurred while Creating New User',
  verifiedAccountExists: 'Account Already Verified',
  VerifieldSuccess: 'Verified Sucessfully',
  VerifieldFailure: 'Invalid Pin',
  pinSentsuccess: 'Pin Sent Successfully ',
  sucessfullyLogin: "Login Sucesssfully",
  passwordUpdatedSucess: "Password Changed Successfullly",
  forgetPasswordMail: "Mail Sent Sucessfully",
  invalidPassword: 'You Have Entered An Invalid Username Or Password',
  inCorrectNumber:"You Have Entered An Invalid ContactNumber",
  invalOldPwd: 'You Have Entered An Incorrect Password',
  invalidBody: "Please Provide All The Required Fields.",
  incorrectEmailid: 'You Have Entered An Invalid Emailid or Contactnumber',
  incorrectContactAndISD: 'You Have Entered An Invalid Contactnumber Or IsdCode',
  inValidToken: "Invalid Access Please Login Again",
  internalServerError: 'Internal Server Error',
  imageUpload: 'Image Uploaded Successfully',
  errorInVerifyAccount: 'Please Verify Your Account',
  editSuccess: 'Succesfully Edited',
  tokenNotPrvided: "Please Provide Tocken.",
  gentoknfailure: 'An Error Occurred while Creating Tocken',
  imageDeleteSucess: "Image Removed Successfully",
  Noimagefound: "No Image Found",
  WELCOME: 'Welcome to Emoji App',
  Forgotpassword: 'Forgot Password',
  userDetails: 'User Details',
  errorInSendMaill: "Unable to send Mail",
  errorintocken: 'Unable to Generate Token',
  incorrectid: "User Not Found",
  noDataFound:"Not Found",
  numNotExits:"Number Not Exists"
};
const codes = {
  SUCCESS: 200,
  BADREQUEST: 400,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  INTRNLSRVRERR: 500,
  FAILURECASE:0,
  SUCCESSCASE:1
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

