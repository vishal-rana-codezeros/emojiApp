var userRouter = require('express').Router();
var userService = require('./userService')
var validate = require('./userValidator')
var http = require('http').Server(userRouter);
var multer = require('multer')
var upload = multer()
//<------------------------------------------------------Update Api`s starts from here--------------------------------------------------------------------------------------------------------------------------------------------->

userRouter.route("/register")
    .post([upload.none(), validate.validateSignUp], (req, res) => {
        userService.register(req, res).then((data1) => {
            return res.json(data1)
        })
    })
userRouter.route("/login")
    .post([upload.none(), validate.ValidateLogin], (req, res) => {
        userService.login(req, res).then((data) => {
            return res.json(data)
        })
    })
userRouter.post("/checkEmailExist", [upload.none()], (req, res) => {
    userService.checkEmailExist(req, res).then((data) => {
        return res.json(data)
    })
})
userRouter.route("/checkNumberExist")
    .post([upload.none(), validate.ValidateNumberExist], (req, res) => {
        userService.checkNumberExist(req, res).then((data) => {
            return res.json(data)
        })
    })
// userRouter.post("/imageUpload", (req, res) => {
//     userService.imageUpload(req, res)
// })


userRouter.route("/imageUpload/:id")
    .post((req, res) => {
        userService.imageUpload(req, res).then((data) => {
            console.log("Data",data)
            return res.json(data)
        })
    })

userRouter.post("/syncContacts", (req, res) => {
    userService.syncContacts(req, res)
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
userRouter.route("/editProfile/:id")
    .put([validate.verifyToken], (req, res) => {
        userService.editProfile(req, res).then((data) => {
            return res.json(data)
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

// <--------------------------------------------------Socket-Route-Starts-Here-------------------------------------------------------------------------------------------->


userRouter.get("/getUserDetails/:id", (req, res) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>in userdata")
    userService.getUserDetails(req, res)
});


userRouter.get("/getChatDetails/:id", (req, res) => {
    userService.getChatDetails(req, res)
})


userRouter.get("/groupData/:id", (req, res) => {
    userService.groupData(req, res)
})


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