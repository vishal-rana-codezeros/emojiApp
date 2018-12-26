var adminRouter = require('express').Router();
var adminService=require('./adminService')
var validate=require('./adminvalidator')


adminRouter.route("/getAllUser")
.get([validate.verifyToken], (req, res) => { 
    adminService.getAllUser(req, res) 
})

adminRouter.route("/getOneUser/:id")
.get([validate.verifyToken], (req, res) => { 
    adminService.getOneUser(req, res) 
})


adminRouter.route("/updateUser/:id")
.put([validate.verifyToken], (req, res) => { 
    adminService.updateUser(req, res) 
})

adminRouter.route("/deleteUser/:id")
.put([validate.verifyToken], (req, res) => { 
    adminService.deleteUser(req, res) 
})

adminRouter.route("/recordCount")
.get([validate.verifyToken], (req, res) => { 
    adminService.recordCount(req, res) 
})

adminRouter.route("/activeUser/:id")
.put([validate.verifyToken], (req, res) => { 
    adminService.activeUser(req, res) 
})

adminRouter.route("/countMaleUserData")
.get([validate.verifyToken],(req,res) =>{
    adminService.countMaleUserData(req,res)
})

adminRouter.route("/countFemaleUserData")
.get([validate.verifyToken],(req,res) =>{
    adminService.countFemaleUserData(req,res)
})

adminRouter.route("/addAboutusPage/:id")
.post([validate.verifyToken],(req,res) =>{
    adminService.addAboutusPage(req,res)
})

adminRouter.route("/updateAboutusPage/:id")
.put([validate.verifyToken], (req, res) => { 
    adminService.updateAboutusPage(req, res) 
})

adminRouter.route("/getAboutusPage")
.get([validate.verifyToken],(req,res) => {
    adminService.getAboutusPage(req,res)
})

// adminRouter.route("/edit")
module.exports= adminRouter;