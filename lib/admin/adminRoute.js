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


module.exports= adminRouter;