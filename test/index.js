let chai = require('chai');
let chaiHttp = require('chai-http');
var expect = require("chai").expect;
chai.use(chaiHttp);
const fs = require('fs');

var app = 'localhost:5001/emojiApp/v2/api/user';
var app1 = 'localhost:5001/emojiApp/v2/api/admin';
// var adminId='5c358b5e463b041e3d4ea50b';
// var userId ='5c35b95e41ac5278be99ad3e';
var token
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

describe("(2)login", function () {
  it("login", function (done) {
    chai.request(app)
      .post('/login')
      .send({
        "emailId": "admin@emojiapp.com",

        "password": "admin@123"
      })
      .end(function (err, res) {
        let body = JSON.parse(res.text)
        console.log("res", body);
        let token1 = body.resp.token;
        token = token1;
       expect(res.statusCode).to.equal(200);
        done();
      });
  });

});

describe("(3)getAllUser", function () {
  it("getAllUser", function (done) {
    chai.request(app1)
      .get('/getAllUser?page=0&size=2&filter=prem')
      .set('authorization', `${token}`)
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

});

describe("(4)getOneUser", function () {
  it("getOneUser", function (done) {
    chai.request(app1)
      .get('/getOneUser/5c3844ba3e64a24549daa6f3')
      .set('authorization', `${token}`)
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

});



describe("(5)updateUser", function () {
  it("updateUser", function (done) {
    chai.request(app1)
      .put('/updateUser/5c3844ba3e64a24549daa6f3')
      .set('authorization', `${token}`)
      .send({
        "userName": "Romil",
        "fullName": "Romil sinha",
        "contactNumber": "+917874814141",
        "emailId": "Romil.sinha@dataeximit.com",
        "password": "123@aa",
        "deviceType": "IOS",
        "deviceToken": "v1i2s2h2a3l@",
        "gender": "male"
      })
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

});

describe("(6)deleteUser", function () {
  it("deleteUser", function (done) {
    chai.request(app1)
      .put('/deleteUser/5c3844ba3e64a24549daa6f3')
      .set('authorization', `${token}`)
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe("(7)activeUser", function () {
  it("activeUser", function (done) {
    chai.request(app1)
      .put('/activeUser/5c3844ba3e64a24549daa6f3')
      .set('authorization', `${token}`)
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

});

describe("(8)recordCount", function () {
  it("recordCount", function (done) {
    chai.request(app1)
      .get('/recordCount')
      .set('authorization', `${token}`)
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

});

describe("(9)addAboutusPage", function () {
  it("addAboutusPage", function (done) {
    chai.request(app1)
      .post('/addAboutusPage/5c383865daaf55368e1f5de8')
      .set('authorization', `${token}`)
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

});

describe("(10)updateAboutusPage", function () {
  it("updateAboutusPage", function (done) {
    chai.request(app1)
      .put('/updateAboutusPage/5c3eb4500f8986428645c1e7')
      .set('authorization', `${token}`)
      .send({
        "description": "This is for testing",
      })
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

});

describe("(11)getAboutusPage", function () {
  it("getAboutusPage", function (done) {
    chai.request(app1)
      .get('/getAboutusPage')
      .set('authorization', `${token}`)
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe("(12)addKeyboard", function () {
  it("addKeyboard", function (done) {
    chai.request(app1)
      .post('/addKeyboard/5c383865daaf55368e1f5de8')
      .set('authorization', `${token}`)
      .send({
        "keyboardName": "k1",
        "category": "5c372d1e6ff7d64ac972731b",
        "keyboardType": "free"
      })
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe("(13)updateKeyboardDetails", function () {
  it("updateKeyboardDetails", function (done) {
    chai.request(app1)
      .put('/updateKeyboardDetails/5c3eb4f87a72f445867407ea')
      .set('authorization', `${token}`)
      .send({
        "keyboardName": "k5",
        "category": "cat3",
        "keyboardType": "free"
      })
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe("(14)deleteKeyboard", function () {
  it("deleteKeyboard", function (done) {
    chai.request(app1)
      .put('/deleteKeyboard/5c3eb4f87a72f445867407ea')
         .set('authorization', `${token}`)
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe("(15)activeKeyboard", function () {
  it("activeKeyboard", function (done) {
    chai.request(app1)
      .put('/activeKeyboard/5c3eb4f87a72f445867407ea')
      .set('authorization', `${token}`)
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe("(16)getAllKeyboardDetails", function () {
  it("getAllKeyboardDetails", function (done) {
    chai.request(app1)
      .get('/getAllKeyboardDetails?page=0&size=2&filter=')
      .set('authorization', `${token}`)
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe("(17)getOneKeyboardDetails", function () {
  it("getOneKeyboardDetails", function (done) {
    chai.request(app1)
      .get('/getOneKeyboardDetails/5c3eb4f87a72f445867407ea')
      .set('authorization', `${token}`)
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

});

describe("(18)addCategory", function () {
  it("addCategory", function (done) {
    chai.request(app1)
      .post('/addCategory/5c383865daaf55368e1f5de8')
      .set('authorization', `${token}`)
      .send({
        "categoryName": "Category 10"
      })
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe("(19)updateCategory", function () {
  it("updateCategory", function (done) {
    chai.request(app1)
      .put('/updateCategory/5c3eba5d327ba64d58d4fb5e')
      .set('authorization', `${token}`)
      .send({
        "categoryName": "Category 12"
      })
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe("(20)getAllCategory", function () {
  it("getAllCategory", function (done) {
    chai.request(app1)
      .get('/getAllCategory?page=0&size=10&filter=')
      .set('authorization', `${token}`)
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe("(21)getOneCategoryData", function () {
  it("getOneCategoryData", function (done) {
    chai.request(app1)
      .get('/getOneCategoryData/5c3eba5d327ba64d58d4fb5e')
      .set('authorization', `${token}`)
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

});
describe("(22)deleteCategory", function () {
  it("deleteCategory", function (done) {
    chai.request(app1)
      .put('/deleteCategory/5c3eba5d327ba64d58d4fb5e')
      .set('authorization', `${token}`)
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe("(23)activeCategory", function () {
  it("activeCategory", function (done) {
    chai.request(app1)
      .put('/activeCategory/5c3eba5d327ba64d58d4fb5e')
      .set('authorization', `${token}`)
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe("(24)getActiveCatList", function () {
  it("getActiveCatList", function (done) {
    chai.request(app1)
      .get('/getActiveCatList')
      .set('authorization', `${token}`)
      .end(function (err, res) {
        console.log("res", JSON.parse(res.text));
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

});

// describe("(18)verifyAccount", function () {
//   it("verifyAccount", function (done) {
//     chai.request(app)
//       .post('/verifyAccount/5c2de095917d4e1947d2fc12')
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












