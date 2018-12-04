var adminRouter = require('express').Router();
var adminService=require('./adminService')
var validate=require('./adminvalidator')


adminRouter.post("/viewAllUserData",(req,res)=>{
adminService.viewAllUserData(req,res)
})

// adminRouter.post("/editUserData/:id",(req,res)=>{
//     adminService.editUserData(req,res)
// })

adminRouter.route("/editUserData/:id")
.post([validate.verifyToken], (req, res) => { 
    adminService.editUserData(req, res) 
})

adminRouter.route("/deleteUserData/:id")
.post([validate.verifyToken], (req, res) => { 
    adminService.deleteUserData(req, res) 
})


module.exports= adminRouter;