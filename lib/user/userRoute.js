var userRouter = require('express').Router();
var userService=require('./userService')
var validate=require('./userValidator')

userRouter.route("/register")
.post([validate.validateSignUp], (req, res) => { 
userService.register(req, res) 
})

userRouter.route("/verifyAccount/:id")
.post([validate.validateverifyAccount], (req, res) => { 
userService.verifyAccount(req, res) 
})

userRouter.get("/resendPin/:id",(req,res)=>{
    userService.resendPin(req,res)
})

userRouter.route("/login")
.post([validate.ValidateLogin], (req, res) => {     
userService.login(req, res) 
})

userRouter.route("/forgotPassword")
.post([validate.validateForgotPassword], (req, res) => { 
userService.forgotPassword(req, res) 
})

userRouter.route("/changePassword/:id")
.put([validate.verifyToken,validate.validatechangePassword,], (req, res) => { 
userService.changePassword(req, res) 
})

userRouter.route("/editProfile/:id")
.put([validate.verifyToken], (req, res) => { 
userService.editProfile(req, res) 
})

userRouter.post("/socialLogin",(req,res)=>{
    userService.socialLogin(req,res)
})

userRouter.post("/imageUpload",(req,res)=>{
    userService.imageUpload(req,res)
})

module.exports = userRouter;