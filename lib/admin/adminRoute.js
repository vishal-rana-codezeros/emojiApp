var adminRouter = require('express').Router();
var adminService = require('./adminService')
var validate = require('./adminvalidator')


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


adminRouter.route("/addAboutusPage/:id")
    .post([validate.verifyToken], (req, res) => {
        adminService.addAboutusPage(req, res)
    })


adminRouter.route("/updateAboutusPage/:id")
    .put([validate.verifyToken], (req, res) => {
        adminService.updateAboutusPage(req, res)
    })


adminRouter.route("/getAboutusPage")
    .get([validate.verifyToken], (req, res) => {
        adminService.getAboutusPage(req, res)
    })


adminRouter.route("/addKeyboard/:id")
    .post([validate.verifyToken], (req, res) => {
        adminService.addKeyboard(req, res)
    })

adminRouter.route("/updateKeyboardDetails/:id")
    .put([validate.verifyToken], (req, res) => {
        adminService.updateKeyboardDetails(req, res)
    })

adminRouter.route("/deleteKeyboard/:id")
    .put([validate.verifyToken], (req, res) => {
        adminService.deleteKeyboard(req, res)
    })

adminRouter.route("/activeKeyboard/:id")
    .put([validate.verifyToken], (req, res) => {
        adminService.activeKeyboard(req, res)
    })


adminRouter.route("/getAllKeyboardDetails")
    .get([validate.verifyToken], (req, res) => {
        adminService.getAllKeyboardDetails(req, res)
    })
module.exports = adminRouter;