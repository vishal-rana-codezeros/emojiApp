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

adminRouter.route("/getOneKeyboardDetails/:id")
    .get([validate.verifyToken], (req, res) => {
        adminService.getOneKeyboardDetails(req, res)
    })

adminRouter.route("/addCategory/:id")
    .post([validate.verifyToken], (req, res) => {
        adminService.addCategory(req, res)
    })

adminRouter.route("/updateCategory/:id")
    .put([validate.verifyToken], (req, res) => {
        adminService.updateCategory(req, res)
    })

adminRouter.route("/deleteCategory/:id")
    .put([validate.verifyToken], (req, res) => {
        adminService.deleteCategory(req, res)
    })

adminRouter.route("/activeCategory/:id")
    .put([validate.verifyToken], (req, res) => {
        adminService.activeCategory(req, res)
    })

adminRouter.route("/getOneCategoryData/:id")
    .get([validate.verifyToken], (req, res) => {
        adminService.getOneCategoryData(req, res)
    })

adminRouter.route("/getAllCategory")
    .get([validate.verifyToken], (req, res) => {
        adminService.getAllCategory(req, res)
    })

adminRouter.route("/getActiveCatList")
    .get([validate.verifyToken], (req, res) => {
        adminService.getActiveCatList(req, res)
    })

module.exports = adminRouter;