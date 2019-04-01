var user = require('../lib/user/userService');
var admin = require('../lib/admin/adminService')
let chai = require('chai');
var server = require('../server.js')
let chaiHttp = require('chai-http');
var expect = require("chai").expect;
const assert = require('assert');
chai.use(chaiHttp);


//---------------------------------------------------------------------UserSide-API-Starts------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
describe('(1)POST register', () => {
    it('It Should Create a User', function (done) {
        var req = {};
        req.body =
            {
                "userName": "Prem",
                "fullName": "Prem Makwana",
                "contactNumber": "+917874814195",
                "emailId": "Prem.Makwana@codezeros.com",
                "password": "123@aa",
                "deviceType": "IOS",
                "deviceToken": "v1i2s2h2a3l@",
                "gender": "male"
            }
        var res = {}

        user.register(req, res).then((result) => {
            console.log("Register Response", result);
        });
        done();
    })
})
describe('(2)POST resenddPin', () => {
    it('It should resend the pin', function (done) {
        // this.timeout(500);
        // setTimeout(done, 300);
        var req = {}
        req.params = {
            "id": "5c6e6d5641658b273b9f8d3c"
        }
        let res = {}
        user.resendPin(req, res).then((data) => {
            console.log("Resend Pin Response", data)
        })
        done();
    })
})
describe('(3)POST  VerifyAccount', () => {
    it("It should Verify User Acccount", function (done) {
        let req = {}
        req.params = {
            "id": "5c6e85cb7fb4b34de32c5098"

        }
        req.body = {
            "pin": "3545"

        }
        let res = {}
        user.verifyAccount(req, res).then((data) => {
            console.log("Verify Account Responce", data)
        })
        done();
    })
})
describe('(4)POST login', () => {
    it('Login Request', (done) => {
        var req = {};
        req.body = {
            "emailId": "admin@emojiapp.com",
            "password": "admin@123",
        }
        var res = {}
        user.login(req, res).then((result) => {
            console.log("Login Response", result);
        });
        done();
    })
})
describe('(5)POST forgotPassword', () => {
    it('Forgot Password Request', function (done) {
        let req = {}
        req.body = {
            "emailId": "prem.makvana@codezeros.com"
        }
        let res = {}
        user.forgotPassword(req, res).then((data) => {
            console.log("Forgot Password RESPONSE", data)
        })
        done();
    })
})
describe('(6)POST changePassword', () => {
    it('change Password Request', function (done) {
        let req = {}
        req.params = {
            "id": "5c6e6d5641658b273b9f8d3c"

        }
        req.body = {
            "oldPassword": "123@ab",
            "newPassword": "123@ab"

        }
        let res = {}
        user.changePassword(req, res).then((data) => {
            console.log("changePassword", data)
        })
        done();
    })
})
describe('(7)POST editProfile ', () => {
    it('editProfile Requsest', function (done) {
        let req = {}
        req.params = {
            "id": "5c6e6d5641658b273b9f8d3c"

        }
        req.body = {
            "userName": "karan",
            "image": "http://res.cloudinary.com/yunu121/image/upload/v1543826940/prxzdnubvyztuniluqgq.jpg",
            "contactNumber": "+916360132700",
            "emailId": "karan.patel@codezero.com"
        }
        let res = {}
        user.editProfile(req, res).then((data) => {
            console.log("changePassword Response", data)
        })
        done();
    })
})
describe('(8)POST socialLogin', () => {
    it('socialLogin Request', function (done) {
        let req = {}
        req.body = {
            "userName": "Jmaesh2112",
            "fullName": "Jmaesh21",
            "socialId": "Shalin.Jmsdfsfassdsdesh@dghfhhmi.com",
            "loginType": "social",
            "deviceType": "IOS",
            "deviceToken": "123456aa",
            "emailId": "Rahul.roy@codezeros.com",
            "password": "123@ab",
            "contactNumber": "+917874814195"
        }
        let res = {}
        user.socialLogin(req, res).then((data) => {
            console.log("socialLogin Response", data)
        })
        done();
    })
})

//--------------------------------------------------------------UserSide-API-Ends---------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------socket-api-starts------------------------------------------------------------------------------------------------
describe('(9)POST getUserDetails', () => {
    it('getUserDetails Request', function (done) {
        var req = {}
        req.params = {
            "id": "5c6e3ec743929f3806464200"
        }
        let res = {}
        user.getUserDetails(req, res).then((data) => {
            console.log(" getUserDetails Response", data)
        })
        done();
    })
})
describe('(10)POST getChatDetails', () => {
    it(' getChatDetails', function (done) {
        var req = {}
        req.params = {
            "id": "5c64fc59e35f2d23ef102493"
        }
        let res = {}
        user.getChatDetails(req, res), ((err, data) => {
            console.log(" getChatDetails Response", data)
        })
        done();
    })
})
describe('(11)POST groupData', () => {
    it(' groupData', function (done) {
        var req = {}
        req.params = {
            "id": "5c64fc59e35f2d23ef102493"
        }
        let res = {}
        user.groupData(req, res), ((err, data) => {
            if (err) {
                console.log("into data")
            }
            else {
                console.log(" groupData Response", data)
            }
        })
        done();

    })
})
//---------------------------------------------------------------------Socket-API-Ends--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------AdminSide-API-Starts-------------------------------------------------------------------------------------------------------------------------------------------------------
describe('(1)GET getAllUser', () => {
    it('It Should Give Details of  All User', (done) => {
        var req = {};
        req.query = {
            page: 0, size: 10,
        }
        admin.getAllUser(req).then((result) => {
            console.log("getAllUser Response", result);
        });
        done();
    })
})
describe('(2)GET getOneUser', () => {
    it('It Should Give Details of  Selected(one) User', (done) => {
        var req = {};
        req.params = {
            "id": "5c6e8544f94f314d297df29b"
        }
        var res = {}
        admin.getOneUser(req, res).then((result) => {
            console.log("getOneUser Response", result);
        });
        done();
    })
})
describe('(3)PUT updateUser', () => {
    it('It Should Update The User Details', (done) => {
        var req = {};
        req.params = {
            "id": "5c6e8544f94f314d297df29b"
        }
        req.body = {
            "gender": "male",
            "role": "USER",
            "loginType": "normal",
            "image": "",
            "status": "",
            "userName": "ABC"
        }
        var res = {}
        admin.updateUser(req, res).then((result) => {
            console.log("updateUser Response", result);
        });
        done();
    })
})
describe('(4)PUT setUserActivity', () => {
    it('setUserActivity request', (done) => {
        var req = {};
        req.params = {
            "id": "5c6e8544f94f314d297df29b"
        }
        var res = {}
        admin.setUserActivity(req, res).then((result) => {
            console.log("setUserActivity Response", result);
        });
        done();
    })
})
describe('(5)POST addAboutusPage', () => {
    it('It Should Create a AboutusPage', function (done) {
        var req = {};
        req.params = {
            "id": "5c64fc59e35f2d23ef102492"
        }
        req.body = {
            "description": "This is an about us page"
        }
        var res = {}

        admin.addAboutusPage(req, res).then((result) => {
            console.log("AddAboutusPage Response", result);
        });
        done();
    })
})
describe('(6)PUT updateAboutusPage', () => {
    it('It Should Update a Aboutus Page', (done) => {
        var req = {};
        req.params = {
            "id": "5c650bcb8fd01239021d5078"
        }
        req.body = {
            "description": "This is an updated about us page."
        }
        var res = {}
        admin.updateAboutusPage(req, res).then((result) => {
            console.log("UpdateAboutusPage RESPONSE", result);
        });
        done();
    })
})
describe('(7)GET getAboutusPage', () => {
    it('getAboutusPage request', (done) => {
        var req = {};
        req.query = {
            page: 0, size: 10,
        }

        admin.getAboutusPage(req).then((result) => {
            console.log("GetAboutusPage RESPONSE", result);
        });
        done();
    })
})

describe('(8)POST addKeyboard', () => {
    it('it should create a Keyboard', function (done) {
        var req = {};
        req.params = {
            "id": "5c64fc59e35f2d23ef102492"
        }
        req.body = {
            "keyboardName": "Demo Keyboard 01",
            "categoryName": "5c6e99ef799bd173c223eeb6",
            "keyboardType": "paid",
            "cost": 250,
            "image": [
                "http://res.cloudinary.com/yunu121/image/upload/v1546950238/gr8t0nqmkkqdou2fqnvu.jpg",
                "http://res.cloudinary.com/yunu121/image/upload/v1546950238/bunxixbg03yrfwgajpgf.jpg",
                "http://res.cloudinary.com/yunu121/image/upload/v1546950238/uyuvj8wvadmfcdh6h7nq.jpg"
            ]
        }
        var res = {}
        admin.addKeyboard(req, res).then((result) => {
            console.log("addKeyboard Response", result);
        });
        done();
    })
})
describe('(9)GET getAllKeyboardDetails', () => {
    it('It Should Return the All Keyboard Data', (done) => {
        var req = {};
        req.query = {
            page: 0, size: 10,
        }
        admin.getAllKeyboardDetails(req).then((result) => {
            console.log("getAllKeyboardDetails RESPONSE", result);
        });
        done();
    })
})
describe('(10)PUT getOneKeyboardDetails', () => {
    it('It Should Gives selected Keyboard Details', (done) => {
        var req = {};
        req.params = {
            "id": "5c6e9a8169076b75c88f7bb8"
        }
        var res = {}
        admin.getOneKeyboardDetails(req, res).then((result) => {
            console.log("getOneKeyboardDetails RESPONSE", result);
        });
        done();
    })
})
describe('(11)PUT updateKeyboardDetails', () => {
    it('updateKeyboardDetails request', (done) => {
        var req = {};
        req.params = {
            "id": "5c6e9a8169076b75c88f7bb8"
        }
        req.body = {
            "keyboardName": "Upadated keyboard 10",
            "status": "ACTIVE",
            "keyboardType": "paid",
            "categoryName": "5c5aa1cb1ae7ea29c8530031"
        }
        var res = {}
        admin.updateKeyboardDetails(req, res).then((result) => {
            console.log("updateKeyboardDetails RESPONSE", result);
        });
        done();
    })
})
describe('(12)PUT setKeyboardActivity', () => {
    it('setKeyboardActivity request', (done) => {
        var req = {};
        req.params = {
            "id": "5c6e9a8169076b75c88f7bb8"
        }
        var res = {}
        admin.setKeyboardActivity(req, res).then((result) => {
            console.log("setKeyboardActivity RESPONSE", result);
        });
        done();
    })
})


describe('(13)POST addCategory', () => {
    it('It Should Create a Category', function (done) {
        var req = {};
        req.params = {
            "id": "5c6414b5197e7e476acadc85"
        }
        req.body = {
            "categoryName": "Demo category1"
        }
        var res = {}

        admin.addCategory(req, res).then((result) => {
            console.log("AddCategory Response", result);
        });
        done();
    })
})
describe('(15)GET getAllCategory', () => {
    it('It Should Gives List Of Category', (done) => {
        var req = {};
        req.query = {
            page: 0, size: 10,
        }

        admin.getAllCategory(req).then((result) => {
            console.log("getAllCategory RESPONSE", result);
        });
        done();
    })
})
describe('(16)GET getOneCategoryData', () => {
    it('It Should Gives Details Of Selected Category', (done) => {
        var req = {};
        req.params = {
            "id": "5c650dbbd4a27d3c04395c4d"
        }
        var res = {}
        admin.getOneCategoryData(req, res).then((result) => {
            console.log("getOneCategoryData RESPONSE", result);
        });
        done();
    })
})
describe('(17)PUT updateCategory', () => {
    it('It should Edit the Category details', (done) => {
        var req = {};
        req.params = {
            "id": "5c650dbbd4a27d3c04395c4d"
        }
        req.body = {
            "categoryName": "Updated Demo category1012"
        }
        var res = {}
        admin.updateCategory(req, res).then((result) => {
            console.log("updateKeyboardDetails Response", result);
        });
        done();
    })
})
describe('(18)PUT activeCategory', () => {
    it('It Should Activate Category ', (done) => {
        var req = {};
        req.params = {
            "id": "5c650dbbd4a27d3c04395c4d"
        }
        var res = {}
        admin.activeCategory(req, res).then((result) => {
            console.log("activeCategory Response", result);
        });
        done();
    })
})
describe('(19)PUT deleteCategory', () => {
    it('It Should Deactivate Category ', (done) => {
        var req = {};
        req.params = {
            "id": "5c650dbbd4a27d3c04395c4d"
        }
        var res = {}
        admin.deleteCategory(req, res).then((result) => {
            console.log("deleteCategory Response", result);
        });
        done();
    })
})
describe('(20)GET getActiveCatList', () => {
    it('It Should Gives The List of Active Category', (done) => {
        var req = {};
        var res = {}
        admin.getActiveCatList(req, res).then((result) => {
            console.log("Get All Active Category Response", result);
        });
        done();
    })
})


//------------------------------------------------------------AdminSide-API-Ends----------------------------------------------------------------------------------------------------------------------------------------------------------------


















