var userRouter = require('express').Router();
var userService=require('./userService')

userRouter.post("/register",(req,res)=>{
    userService.register(req,res)
})

userRouter.post("/verifyPin/:id",(req,res)=>{
    userService.verifyPin(req,res)
})

userRouter.post("/resendPin/:id",(req,res)=>{
    userService.resendPin(req,res)
})

userRouter.post("/login",(req,res)=>{
    userService.login(req,res)
})

userRouter.post("/forgotPassword",(req,res)=>{
    userService.forgotPassword(req,res)
})

userRouter.post("/changePassword/:id",(req,res)=>{
    userService.changePassword(req,res)
})

userRouter.post("/editProfile/:id",(req,res)=>{
    userService.editProfile(req,res)
})

userRouter.post("/socialLogin",(req,res)=>{
    userService.socialLogin(req,res)
})
// console.log("Into UserRoute")
module.exports = userRouter;