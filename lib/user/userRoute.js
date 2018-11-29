var userRouter = require('express').Router();
var userService=require('./userService')
var validate=require('./userValidator')

userRouter.route("/register")
.post([validate.validateSignUp], (req, res) => { 
userService.register(req, res) 
})

userRouter.route("/verifyPin/:id")
.post([validate.validateVeryfyPin], (req, res) => { 
userService.verifyPin(req, res) 
})

userRouter.post("/resendPin/:id",(req,res)=>{
    userService.resendPin(req,res)
})

userRouter.route("/login")
.post([validate.ValidateLogin], (req, res) => { 
userService.login(req, res) 
})

userRouter.route("/forgotPassword/:id")
.post([validate.verifyToken,validate.validateForgotPassword], (req, res) => { 
userService.forgotPassword(req, res) 
})

userRouter.route("/changePassword/:id")
.post([validate.verifyToken,validate.validatechangePassword,], (req, res) => { 
userService.changePassword(req, res) 
})

userRouter.route("/editProfile/:id")
.post([validate.verifyToken], (req, res) => { 
userService.editProfile(req, res) 
})

// userRouter.route("/cloudinaryImageUploader")
// .post([validate.verifyToken], (req, res) => { 
// userService.cloudinaryImageUploader(req, res) 
// })

userRouter.route("/cloudinaryImageDelete")
.post([validate.verifyToken], (req, res) => { 
userService.cloudinaryImageDelete(req, res) 
})

userRouter.post("/socialLogin",(req,res)=>{
    userService.socialLogin(req,res)
})

userRouter.post("/cloudinaryImageUploader",(req,res)=>{
    userService.cloudinaryImageUploader(req,res)
})

userRouter.post("/cloudinaryImageDelete/:id",(req,res)=>{
    userService.cloudinaryImageDelete(req,res)
})




module.exports = userRouter;