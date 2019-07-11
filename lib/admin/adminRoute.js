var adminRouter = require('express').Router();
var adminService = require('./adminService')
var validate = require('./adminvalidator')
var multer = require('multer')
var upload = multer()

adminRouter.route("/getAllUser")
    .get([validate.verifyToken], (req, res) => {
        adminService.getAllUser(req, res).then((data) => {
            return res.json(data)
        })
    })
adminRouter.route("/getOneUser/:id")
    .get([validate.verifyToken], (req, res) => {
        adminService.getOneUser(req, res).then((data) => {
            return res.json(data)
        })
    })
adminRouter.route("/updateUser/:id")
    .put([validate.verifyToken], (req, res) => {
        adminService.updateUser(req, res).then((data) => {
            return res.json(data)
        })
    })
adminRouter.route("/setUserActivity/:id")
    .put([validate.verifyToken], (req, res) => {
        adminService.setUserActivity(req, res).then((data) => {
            return res.json(data)
        })
    })


adminRouter.route("/recordCount")
    .get([validate.verifyToken], (req, res) => {
        adminService.recordCount(req, res).then((data) => {
            return res.json(data)
        })
    })


adminRouter.route("/addAboutusPage/:id")
    .post([validate.verifyToken], (req, res) => {
        adminService.addAboutusPage(req, res).then((data) => {
            return res.json(data)
        })
    })
adminRouter.route("/updateAboutusPage/:id")
    .put([validate.verifyToken], (req, res) => {
        adminService.updateAboutusPage(req, res).then((data) => {
            return res.json(data)
        })
    })
adminRouter.route("/getcmsPage")
    .get([validate.verifyToken], (req, res) => {
        adminService.getcmsPage(req, res).then((data) => {
            return res.json(data)
        })
    })
//-----------------------------------------------------------------cms pages ----------------------------------------------------------------------------------------
adminRouter.route("/addprivacy_policy/:id")
    .post([validate.verifyToken], (req, res) => {
        adminService.addprivacy_policy(req, res).then((data) => {
            return res.json(data)
        })
    })
adminRouter.route("/updateprivacy_policy/:id")
    .put([validate.verifyToken], (req, res) => {
        adminService.updateprivacy_policy(req, res).then((data) => {
            return res.json(data)
        })
    })
adminRouter.route("/add_terms_conditions/:id")
    .post([validate.verifyToken], (req, res) => {
        adminService.add_terms_conditions(req, res).then((data) => {
            return res.json(data)
        })
    })
adminRouter.route("/update_terms_conditions/:id")
    .put([validate.verifyToken], (req, res) => {
        adminService.update_terms_conditions(req, res).then((data) => {
            return res.json(data)
        })
    })
//-----------------------------------------------------------------cms pages ended ----------------------------------------------------------------------------------------


adminRouter.route("/addKeyboard/:id")
    .post([upload.none(),validate.verifyToken], (req, res) => {
        adminService.addKeyboard(req, res).then((data) => {
            return res.json(data)
        })
    })
adminRouter.route("/updateKeyboardDetails/:id")
    .put([validate.verifyToken], (req, res) => {
        adminService.updateKeyboardDetails(req, res)
    })

adminRouter.route("/setKeyboardActivity/:id")
    .put([validate.verifyToken], (req, res) => {
        adminService.setKeyboardActivity(req, res).then((data) => {
            return res.json(data)
        })
    })
adminRouter.route("/getAllKeyboardDetails")
    .get((req, res) => {
        adminService.getAllKeyboardDetails(req, res)
    })

adminRouter.route("/getOneKeyboardDetails/:id")
    .get([validate.verifyToken], (req, res) => {
        adminService.getOneKeyboardDetails(req, res).then((data) => {
            console.log("into data", data)
            return res.json(data)
        })
    })


adminRouter.route("/addCategory/:id")
    .post([validate.verifyToken], (req, res) => {
        adminService.addCategory(req, res).then((data) => {
            return res.json(data)
        })
    })
adminRouter.route("/getAllCategory")
    .get([validate.verifyToken], (req, res) => {
        adminService.getAllCategory(req, res).then((data) => {
            return res.json(data)
        })
    })
adminRouter.route("/getOneCategoryData/:id")
    .get([validate.verifyToken], (req, res) => {
        adminService.getOneCategoryData(req, res).then((data) => {
            return res.json(data)
        })
    })
adminRouter.route("/updateCategory/:id")
    .put([validate.verifyToken], (req, res) => {
        adminService.updateCategory(req, res).then((data) => {
            return res.json(data)
        })
    })
adminRouter.route("/deleteCategory/:id")
    .put([validate.verifyToken], (req, res) => {
        adminService.deleteCategory(req, res).then((data) => {
            return res.json(data)
        })
    })
adminRouter.route("/activeCategory/:id")
    .put([validate.verifyToken], (req, res) => {
        adminService.activeCategory(req, res).then((data) => {
            return res.json(data)
        })
    })
adminRouter.route("/getActiveCatList")
    .get([validate.verifyToken], (req, res) => {
        adminService.getActiveCatList(req, res).then((data) => {
            return res.json(data)
        })
    })


//-----------------------------------------------------------------getKeyboardImages route  Started ----------------------------------------------------------------------------------------

adminRouter.route("/getImages/:id/:id1")
    .get([validate.verifyToken], (req, res) => {
        adminService.getImages(req, res).then((data) => {
            return res.json(data)
        })
    })

//-----------------------------------------------------------------getKeyboardImages route ended ----------------------------------------------------------------------------------------


module.exports = adminRouter;