var userRouter = require('express').Router();
var userService = require('./userService')
var validate = require('./userValidator')
var http = require('http').Server(userRouter);
var multer = require('multer')
var upload = multer()
let adminService = require("../admin/adminService")
//<------------------------------------------------------Updated Api`s starts from here--------------------------------------------------------------------------------------------------------------------------------------------->

/**
 * this route is used for user registration.
 */
userRouter.route("/register")
    .post([upload.none(), validate.validateSignUp], (req, res) => {
        userService.register(req, res).then((data1) => {
            return res.json(data1)
        })
    })
/**
* this route is used for user login.
*/
userRouter.route("/login")
    .post([upload.none(), validate.ValidateLogin], (req, res) => {
        userService.login(req, res).then((data) => {
            return res.json(data)
        })
    })
/**
 * this route is used for check user with same emailId  exits or not.
 */
userRouter.post("/checkEmailExist", [upload.none()], (req, res) => {
    userService.checkEmailExist(req, res).then((data) => {
        return res.json(data)
    })
})
/**
 * this route is used for check user with same contactNumber  exits or not.
 */
userRouter.route("/checkNumberExist")
    .post([upload.none(), validate.ValidateNumberExist], (req, res) => {
        userService.checkNumberExist(req, res).then((data) => {
            return res.json(data)
        })
    })
/**
 * this route is used for upload image.
 */
userRouter.route("/imageUpload/:id")
    .post((req, res) => {
        userService.imageUpload(req, res).then((data) => {
            return res.json(data)
        })
    })
/**
* this route is used for sync contacts.
*/
userRouter.post("/syncContacts", (req, res) => {
    userService.syncContacts(req, res)
})
/**
 * this route is used for edit profile of user.
 */
userRouter.route("/editProfile/:id")
    .put([upload.none(), validate.verifyToken], (req, res) => {
        userService.editProfile(req, res).then((data) => {
            return res.json(data)
        })
    })
/**
* this route is used for upload group icon.
*/
userRouter.route("/groupIconUpload")
    .post([validate.verifyToken], (req, res) => {
        userService.groupIconUpload(req, res).then((data) => {
            return res.send(data)
        })
    })
/**
* this route is used for add contacUs.
*/
userRouter.route("/addcontactUs/:id")
    .post([upload.none(), validate.verifyToken, validate.ValidateContactUs], (req, res) => {
        userService.addcontactUs(req, res).then((data) => {
            return res.json(data)
        })
    })
/**
* this route is used for get all image on the selection of category and keyboard(subcategory) .
*/
userRouter.route("/getImages/:id/:id1")
    .get([upload.none(), validate.verifyToken], (req, res) => {
        userService.getImages(req, res).then((data) => {
            return res.json(data)
        })
    })
/**
* this route is used for purchaseKeyboard.
*/
userRouter.route("/purchaseKeyboard/:id")
    .get([upload.none(), validate.verifyToken], (req, res) => {
        userService.purchaseKeyboard(req, res).then((data) => {
            return res.json(data)
        })
    })
/**
 * this route use to fetch keyboardImages.
 */
userRouter.route("/fetchKeyboardSubImages/:id")
    .get([validate.verifyToken], (req, res) => {
        userService.fetchKeyboardSubImages(req, res)
    })

/**
 * this route use to fetch all the categories for user.
 */
userRouter.route("/getAllCategory")
    .get([upload.none()], (req, res) => {
        userService.getAllCategory(req, res).then((data) => {
            return res.json(data)
        })
    })
/**
 * this route use to fetch all the keyboard(subcategory) for user.
 */
userRouter.route("/getAllKeyboard")
    .get([upload.none()], (req, res) => {
        userService.getAllKeyboard(req, res).then((data) => {
            return res.json(data)
        })
    })


/**
 * this route use to fetch all the keyboard(subcategory) for user.
 */
userRouter.route("/getKeyboardFromCategory/:id")
    .get([validate.verifyToken], (req, res) => {
        userService.getKeyboardFromCategory(req, res).then((data) => {
            return res.json(data)
        })
    })    
//<---------------------------------------------------------------Updated Api`s ended--------------------------------------------------------------------------------------------------------------------------------->


userRouter.get("/resendPin/:id", (req, res) => {
    userService.resendPin(req, res).then((data) => {
        return res.json(data)
    })
})
userRouter.route("/verifyAccount/:id")
    .post([validate.validateverifyAccount], (req, res) => {
        userService.verifyAccount(req, res).then((data) => {
            return res.json(data)
        })
    })
userRouter.route("/forgotPassword")
    .post([validate.validateForgotPassword], (req, res) => {
        userService.forgotPassword(req, res).then((data) => {
            return res.json(data)
        })
    })
userRouter.route("/changePassword/:id")
    .put([validate.verifyToken, validate.validatechangePassword,], (req, res) => {
        userService.changePassword(req, res).then((data) => {
            return res.send(data)
        })
    })
userRouter.post("/socialLogin", (req, res) => {
    userService.socialLogin(req, res).then((data) => {
        return res.json(data)
    })
})

// userRouter.route("/getOneUser/:id")
//     .get([validate.verifyToken], (req, res) => {
//         adminService.getOneUser(req, res).then((data) => {
//             return res.json(data)
//         })
//     })
// userRouter.post("/socialLogin", (req, res) => {
//     userService.socialLogin(req, res)
// })
userRouter.post("/inviteUser", (req, res) => {
    userService.inviteUser(req, res)
})
userRouter.route("/getCMSPage")
    .get([], (req, res) => {
        userService.getCMS(req, res).then((data) => {
            return res.json(data)
        })
    })


// userRouter.get("/purchaseKeyboard/:id", (req, res) => {
//     userService.purchaseKeyboard(req, res)
// })
// <--------------------------------------------------Socket-Route-Starts-Here-------------------------------------------------------------------------------------------->


userRouter.get("/getUserDetails/:id", (req, res) => {
    userService.getUserDetails(req, res)
});


userRouter.get("/getChatDetails/:id", (req, res) => {
    userService.getChatDetails(req, res)
})


userRouter.get("/groupData/:id", (req, res) => {
    userService.groupData(req, res)
})


// userRouter.get("/fetchKeyboardSubImages/:id", (req, res) => {
//     userService.fetchKeyboardSubImages(req, res)
// })
// userRouter.get("/getUserDetails/:id", (req, res) => {
//     return userService.getUserDetails(req, res).then(result => {
//         console.log(">>>>>>>>.", result)
//         return res.json(result)
//     })
// })

// userRouter.get("/getChatDetails/:id", (req, res) => {
//     return userService.getChatDetails(req, res).then(result => {
//         console.log(">>>>>>>>.", result)
//         return res.json(result)
//     })
// })

// userRouter.get("/groupData/:id", (req, res) => {
//     return userService.groupData(req, res).then(result => {
//         console.log(">>>>>>>>.", result)
//         return res.json(result)
//     })
// })


// <--------------------------------------------------Socket-Route-Ends Here -------------------------------------------------------------------------------------------->

module.exports = userRouter;