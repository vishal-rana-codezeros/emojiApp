var adminRouter = require('express').Router();
var adminService=require('./adminService')
var adminvalidate=require('./adminvalidator')


adminRouter.route("/createAdminTemplate/:id")
.post([adminvalidate.validateAdminTemplate], (req, res) => { 
adminService.createAdminTemplate(req, res) 
})

adminRouter.route("/login")
.post([adminvalidate.ValidateLogin], (req, res) => { 
    adminService.login(req, res) 
})

module.exports= adminRouter;