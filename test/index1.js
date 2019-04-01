
// let mongoose = require("mongoose");
// let User = require('../lib/schema/emojiapp');
// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../server');
// let should = chai.should();



// chai.use(chaiHttp);

// describe('Users', () => {
//   beforeEach((done) => {
//     User.remove({}, (err) => {
//       done();
//     });
//   });

// describe('(1)Register', () => {
//   it('user Registration', (done) => {
//     let user = {
//       userName: "Shalin",
//       fullName: "Shalin shah",
//       contactNumber: "+917874814195",
//       emailId: "prem.makvana@codezeros.com",
//       password: "123@aa",
//       gender: "male",
//       deviceToken: "123ew43433434454tt",
//       deviceType: "IOS"
//     }
//     chai.request(server)
//       .post('/user')
//       .send(user)
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });
// });
//   describe('(2)Login ', () => {
//     it('user Login', (done) => {
//       let user = {
//         emailId: "admin@emojiapp.com",

//         password: "admin@123"
//       }
//       chai.request(server)
//         .post('/user')
//         .send(user)
//         .end(function (err, res) {
//           let body = JSON.parse(res.text)
//           console.log("res", body);
//           let token1 = body.resp.token;
//           token = token1;
//           expect(res.statusCode).to.equal(200);
//           done();
//         });
//     });
//   });
// });






// describe('/POST user', () => {
//   it('login request', (done) => {
//     let user = {
//       "emailId": "admin@emojiapp.com",
//       "password": "admin@123"
//     }
//     chai.request(app)
//       .post('/login')
//       .send(user)
//       .end(function (err, res) {
//         let body = JSON.parse(res.text)
//         console.log("res", body);
//         let token1 = body.resp.token;
//         token = token1;
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });
// })
// var req = {};
// req.body = {
//   "userName": "Shalini",
//   "fullName": "Shalini mitra",
//   "contactNumber": "+918774814194",
//   "emailId": "Shalini.mitra@dataeximit.com",
//   "password": "123@aa",
//   "deviceType": "IOS",
//   "deviceToken": "v1i2s2h2a3l@",
//   "gender": "male"

// }
// console.log(req)
// var res = {}
// describe("(2)Login", function () {
//   it("user login request", function (done) {
//     user.register(req, res).then((result) => {
//       ;
//       this.timeout(10000);
//       console.log(">>>into testing file register>>>>", result)
//       done();
//     })
//   })
// })

// expect(result.statusCode).to.equal(200)
// let d = JSON.parse(data)
//   .end(function (err, res) {
//     console.log("res", JSON.parse(res.text));
//     expect(res.statusCode).to.equal(200);
//   });
// .end(function (err, res) {
//   let body = JSON.parse(res.text)
//   console.log("res", body);
//   let token1 = body.resp.token;
//   token = token1;
//   expect(res.statusCode).to.equal(200);

// });

// done();



// let mongoose = require("mongoose");
// let chai = require('chai');
// let chaiHttp = require('chai-http');
// var expect = require("chai").expect;
// var server = require('../server.js')
// const fs = require('fs');
// var app = 'localhost:5001/emojiApp/v2/api/user';
// var app1 = 'localhost:5001/emojiApp/v2/api/admin';
// var user = require('../lib/user/userService')
// var admin = require('../lib/admin/adminService')
// var token
// const assert = require('assert');
// chai.use(chaiHttp);


// describe("(1)register", function () {
//   it("user register", function (done) {
//     chai.request(app)
//       .post('/register')
//       .send({
//         "userName": "Shalini",
//         "fullName": "Shalini mitra",
//         "contactNumber": "+918774814194",
//         "emailId": "Shalini.mitra@dataeximit.com",
//         "password": "123@aa",
//         "deviceType": "IOS",
//         "deviceToken": "v1i2s2h2a3l@",
//         "gender": "male"
//       })
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });

// });



// describe("(2)login", function () {
//   it("login", function (done) {
//     chai.request(app)
//       .post('/login')
//       .send({
//         "emailId": "admin@emojiapp.com",

//         "password": "admin@123"
//       })
//       .end(function (err, res) {
//         let body = JSON.parse(res.text)
//         console.log("res", body);
//         let token1 = body.resp.token;
//         token = token1;
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });

// });

// describe("(3)getAllUser", function () {
//   it("getAllUser", function (done) {
//     chai.request(app1)
//       .get('/getAllUser?page=0&size=10&filter=prem')
//       .set('authorization', `${token}`)
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });
// });

// describe("(4)getOneUser", function () {
//   it("getOneUser", function (done) {
//     chai.request(app1)
//       .get('/getOneUser/5c5a6f84d7ff76585027451d')
//       .set('authorization', `${token}`)
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });

// });



// describe("(5)updateUser", function () {
//   it("updateUser", function (done) {
//     chai.request(app1)
//       .put('/updateUser/5c5a6f84d7ff76585027451d')
//       .set('authorization', `${token}`)
//       .send({
//         "userName": "Romil",
//         "fullName": "Romil sinha",
//         "contactNumber": "+917874814141",
//         "emailId": "Romil.sinha@dataeximit.com",
//         "password": "123@aa",
//         "deviceType": "IOS",
//         "deviceToken": "v1i2s2h2a3l@",
//         "gender": "male"
//       })
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });

// });

// describe("(6)setUserActivity", function () {
//   it("setUserActivity", function (done) {
//     chai.request(app1)
//       .put('/setUserActivity/5c5a6f84d7ff76585027451d')
//       .set('authorization', `${token}`)
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });
// });

// describe("(8)recordCount", function () {
//   it("recordCount", function (done) {
//     chai.request(app1)
//       .get('/recordCount')
//       .set('authorization', `${token}`)
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });

// });

// describe("(9)addAboutusPage", function () {
//   it("addAboutusPage", function (done) {
//     chai.request(app1)
//       .post('/addAboutusPage/5c383865daaf55368e1f5de8')
//       .set('authorization', `${token}`)
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });

// });

// describe("(10)updateAboutusPage", function () {
//   it("updateAboutusPage", function (done) {
//     chai.request(app1)
//       .put('/updateAboutusPage/5c5a7796ba7b84697d5502ca')
//       .set('authorization', `${token}`)
//       .send({
//         "description": "This is for testing",
//       })
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });

// });

// describe("(11)getAboutusPage", function () {
//   it("getAboutusPage", function (done) {
//     chai.request(app1)
//       .get('/getAboutusPage')
//       .set('authorization', `${token}`)
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });
// });

// describe("(12)addKeyboard", function () {
//   it("addKeyboard", function (done) {
//     chai.request(app1)
//       .post('/addKeyboard/5c5a6f68d7ff76585027451c')
//       .set('authorization', `${token}`)
//       .send({
//         "keyboardName": "k1",
//         "category": "5c5a7796ba7b84697d5502cb",
//         "keyboardType": "free"
//       })
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });
// });

// describe("(13)updateKeyboardDetails", function () {
//   it("updateKeyboardDetails", function (done) {
//     chai.request(app1)
//       .put('/updateKeyboardDetails/5c5aa1cb1ae7ea29c853002f')
//       .set('authorization', `${token}`)
//       .send({
//         "keyboardName": "k5",
//         "category": "cat3",
//         "keyboardType": "free"
//       })
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });
// });

// describe("(14)setKeyboardActivity", function () {
//   it("setKeyboardActivity", function (done) {
//     chai.request(app1)
//       .put('/setKeyboardActivity/5c5aa1cb1ae7ea29c853002f')
//       .set('authorization', `${token}`)
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });
// });

// describe("(16)getAllKeyboardDetails", function () {
//   it("getAllKeyboardDetails", function (done) {
//     chai.request(app1)
//       .get('/getAllKeyboardDetails?page=0&size=10&filter=')
//       .set('authorization', `${token}`)
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });
// });

// describe("(17)getOneKeyboardDetails", function () {
//   it("getOneKeyboardDetails", function (done) {
//     chai.request(app1)
//       .get('/getOneKeyboardDetails/5c5aa1cb1ae7ea29c853002f')
//       .set('authorization', `${token}`)
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });

// });

// describe("(18)addCategory", function () {
//   it("addCategory", function (done) {
//     chai.request(app1)
//       .post('/addCategory/5c5a6f68d7ff76585027451c')
//       .set('authorization', `${token}`)
//       .send({
//         "categoryName": "Category 10"
//       })
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });
// });

// describe("(19)updateCategory", function () {
//   it("updateCategory", function (done) {
//     chai.request(app1)
//       .put('/updateCategory/5c5aa1cb1ae7ea29c8530031')
//       .set('authorization', `${token}`)
//       .send({
//         "categoryName": "Category 12"
//       })
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });
// });

// describe("(20)getAllCategory", function () {
//   it("getAllCategory", function (done) {
//     chai.request(app1)
//       .get('/getAllCategory?page=0&size=10&filter=')
//       .set('authorization', `${token}`)
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });
// });

// describe("(21)getOneCategoryData", function () {
//   it("getOneCategoryData", function (done) {
//     chai.request(app1)
//       .get('/getOneCategoryData/5c5aa1cb1ae7ea29c8530031')
//       .set('authorization', `${token}`)
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });

// });
// describe("(22)deleteCategory", function () {
//   it("deleteCategory", function (done) {
//     chai.request(app1)
//       .put('/deleteCategory/5c5aa1cb1ae7ea29c8530031')
//       .set('authorization', `${token}`)
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });
// });

// describe("(23)activeCategory", function () {
//   it("activeCategory", function (done) {
//     chai.request(app1)
//       .put('/activeCategory/5c5aa1cb1ae7ea29c8530031')
//       .set('authorization', `${token}`)
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });
// });

// describe("(24)getActiveCatList", function () {
//   it("getActiveCatList", function (done) {
//     chai.request(app1)
//       .get('/getActiveCatList')
//       .set('authorization', `${token}`)
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });

// });

// describe("(18)verifyAccount", function () {
//   it("verifyAccount", function (done) {
//     chai.request(app)
//       .post('/verifyAccount/5c5a6f84d7ff76585027451d')
//       .send({
//         "pin": "123",
//       })
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });
// });

// // describe("(19)resendPin", function () {
// //   it("resendPin", function (done) {
// //     // Send some Form Data
// // chai.request(app)
// //       .get('/resendPin/5c2de095917d4e1947d2fc12')
// //       .end(function (err, res) {
// //         console.log("res", JSON.parse(res.text));
// //         expect(res.statusCode).to.equal(200);
// //         done();
// //       });
// //   });

// // });

// describe("(20)forgotPassword", function () {
//   it("forgotPassword", function (done) {
//     chai.request(app)
//       .post('/forgotPassword')
//       .send({
//         "emailId": "Shalini.mitra@dataeximippt.com",
//       })
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });
// });

// describe("(21)changePassword", function () {
//   it("changePassword", function (done) {
//     chai.request(app)
//       .put('/changePassword/5c2de095917d4e1947d2fc12')
//       .send({
//         "oldPassword": "123",
//         "newPassword": "abar"
//       })
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });
// });

// describe("(22)editProfile", function () {
//   it("editProfile", function (done) {
//     chai.request(app)
//       .put('/editProfile/5c2de095917d4e1947d2fc12')
//       .send({
//         "userName": "Rahil",
//         "image": "http://res.cloudinary.com/yunu121/image/upload/v1543826940/prxzdnubvyztuniluqgq.jpg"
//       })
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });
// });

// describe("(23)socialLogin", function () {
//   it("socialLogin", function (done) {
//     chai.request(app)
//       .post('/socialLogin')
//       .send({
//         "userName": "prsdfsdddem",
//         "fullName": "prem123",
//         "socialId": "adffffbcgfgfsdsbvbvbvdsdsdsdsdssxcxcxcxdsddsdcxcgfgg@123",
//         "loginType": "social",
//         "deviceType": "IOS",
//         "deviceToken": "123456aa"
//       })
//       .end(function (err, res) {
//         console.log("res", JSON.parse(res.text));
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });
// });









