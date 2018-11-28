var emoji_schema = require('../schema/emojiapp')
var securePin = require("secure-pin");
var accountSid = 'ACffbfbd1157bb9483f5468c170e724068';
const authToken = 'b90802d6d9bc7524feba86ea00c3a24f';
const client = require('twilio')(accountSid, authToken);
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = 'this_is-a-secret';
var code = require("../responseHandler.js").http_codes
var msg = require("../responseHandler.js").message
var util = require('../appUtil')
const cnstnt = require('./userConstants')
const nodeMailer = require('nodemailer')
var cloudinary = require('cloudinary');
const fileUtil = require('../middleware/multer_file')	
// cloudinary.config({
// 	    cloud_name: 'davujcrpg',
// 	    api_key: '956244168576396',
// 	    api_secret: 'GU0LjEAYL8aJfE_3yhJvZ_NELWA'
// 	});
																			
cloudinary.config({
	cloud_name: 'yunu121',
	api_key: '579755252783132',
	api_secret: 'uRQjHh6oz--PCimbyB87XztRm68'
});


function register(req, res) {
	var user = new emoji_schema(req.body)
	var pin = securePin.generatePinSync(4);
	user.pin = pin;
	user.password = bcrypt.hashSync(req.body.password, 10);
	emoji_schema.findOne({ "emailId": req.body.emailId }).then(async (result) => {
		if (result) {
			return res.json({ code: code.badRequest, message: msg.emailAlreadyRegistered })
		}
		else {
			user.save(async (data) => {
				let msgBody = `Thanks For Registration :- ${pin}`
				await util.sendMessage(msgBody, req.body.contactNumber)
				let html = `<b>Your Pin Is:-</b><h1>${pin}</h1>`
				await util.sendMail(req.body.emailId, cnstnt.regiterMailSubject, html).then((body) => {
					if (body) {
						return res.json({ code: code.ok, message: msg.sucessfullyRegister });
					}
					else {
						return res.json({ code: code.badRequest, message: msg.errorInUserRegistration })
					}
				})
			})
		}
	}).catch(err => { res.json({ code: code.internalError, message: msg.internalServerError }) })
}

function verifyPin(req, res) {
	emoji_schema.findById({ "_id": req.params.id }).then((result) => {
		if (req.body.pin == result.pin) {
			emoji_schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { isVerify: true } }, { new: true }).then((data) => {
				return res.json({ code: code.ok, message: msg.pinVerifieldSucessfully, data })
			})
		}
		else {
			return res.json({ code: code.badRequest, message: msg.errorInPinVerification })
		}
	}).catch(err => { res.json({ code: code.internalError, message: msg.internalServerError }) })
}

function resendPin(req, res) {
	console.log("Into  resendPinService")
	var user = new emoji_schema(req.body)
	var pin = securePin.generatePinSync(4);
	user.pin = pin;
	emoji_schema.find({ _id: req.params.id }).then(async (data) => {
		let msgBody = `Thanks For Registration :- ${pin}`
		await util.sendMessage(msgBody, data[0].contactNumber)
		let html = `<b>Your Pin Number Is:-</b><h1>${pin}</h1>`
		await util.sendMail(data[0].emailId, cnstnt.regiterMailSubject, html).then((result) => {
			if (result) {
				emoji_schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { pin: pin } }, { new: true }, (err, body) => {
					return res.json({ code: code.ok, message: msg.pinResendedsucessfully, body });
				})
			}
			else {
				return res.json({ code: code.badRequest, message: msg.errorInResendPin })
			}
		}).catch(err => { res.json({ code: code.internalError, message: msg.internalServerError }) })
	})
}

async function login(req, res) {
	emoji_schema.findOne({$or:[{ "emailId": req.body.emailId },{"contactNumber":req.body.contactNumber}]}, async (err, data) => {
		if (err) {
			console.log(err)
			return res.json({ code: code.internalError, message: msg.internalServerError });
		}
		else if(!data)
		{
			return res.json({ code: code.badRequest, message: msg.incorrectEmailid });
		}
		else {
			const match = await bcrypt.compare(req.body.password, data.password);
			console.log(req.body.password)
			if (match) {
				const token = await jwt.sign({ Phonenumber: data.contactNumber, id: data._id }, secret, { expiresIn: 60 * 2 });
				return res.json({ code: code.ok, message: msg.sucessfullyLogin, data: data, token: token })
			}
			else {
				return res.json({ code: code.badRequest, message: msg.incorrectPassword })
			}

		}
	}).catch(err => { res.json({ code: code.internalError, message: msg.internalServerError }) })
}

function forgotPassword(req, res) {
	console.log("into forgotpassword")
	emoji_schema.findOne({ "emailId": req.body.emailId }, (err, data1) => {
		if (err) {
			return res.json({ code: code.ok, message: msg.internalServerError })
		}
		else if(!data1)
		{
			return res.json({ code: code.ok, message: msg.emailIdNotFound })
		}
		else  {
			var password = securePin.generatePinSync(6);
			console.log(".............dfg...",password)
			let html = `<b>Your New Password  Is:-</b><h1>${password}</h1>`
			util.sendMail(data1.emailId, cnstnt.regiterMailSubject, html).then((result) => {
				if (result) {
					var Password = bcrypt.hashSync(password, 10);
					emoji_schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { password: Password } }, { new: true }, (err, result1) => {
						console.log("................",result1)
						return res.json({ code: 200, message:msg.passwordUpdatedSucessfullly });
					})
				}
			}).catch(err => { res.json({ code: code.internalError, message: msg.internalServerError }) })
		}
	})
}

function changePassword(req, res) {
	console.log("Into changepassword Service")
	var oldpass = bcrypt.hashSync(req.body.oldPassword, 10);
	var newpass = bcrypt.hashSync(req.body.newPassword, 10);

	emoji_schema.find({ "_id": req.params.id }).then((result) => {
		{
			var match = bcrypt.compare(req.body.oldPassword, result[0].password).then((result1) => {
				if (result1 == true) {
					emoji_schema.findOneAndUpdate({ _id: result[0]._id }, { $set: { password: newpass } }).then((result2) => {
						return res.json({ code: code.ok, message: msg.passwordUpdatedSucessfullly });
					})
				}
				else {
					return res.json({ code: code.badRequest, message: msg.errorInChangePassword })
				}
			})
		}
	}).catch(err => { res.json({ code: code.internalError, message: msg.internalServerError }) })
}

function editProfile(req, res) {
	emoji_schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { userName: req.body.userName, fullName: req.body.fullName } }, (err, data) => {
		if (err) {
			console.log("Error in Updation")
		}
		else { console.log("updated") }
		return res.json({ code: code.ok, message: "Updated Sucessfully", data });

	})
}

function socialLogin(req, res) {
	console.log("Into socialLoggin Page")
	emoji_schema.findOne({ "emailId": req.body.emailId }).then(async (data) => {
		if (data) {
			const match = await bcrypt.compare(req.body.password, data.password);
			if (match) {
				const token = await jwt.sign({ Phonenumber: data.contactNumber, id: data._id }, secret, { expiresIn: 60 * 60 });
				return res.json({ code: code.ok,message: msg.sucessfullyLogin, data: data, token: token })
				exit();
			}
			else {
				return res.json({ code: code.internalError, message: msg.incorrectPassword })
			}
		}
		else {
			console.log("Into socialregi Page reg")
			var user = new emoji_schema(req.body)
			var pin = securePin.generatePinSync(4);
			user.pin = pin;
			user.password = bcrypt.hashSync(req.body.password, 10);
			user.save(async (data) => {
				let msgBody = `Thanks For Registration :- ${pin}`
				await util.sendMessage(msgBody, req.body.contactNumber)
				let html = `<b>Your Pin Is:-</b><h1>${pin}</h1>`
				await util.sendMail(req.body.emailId, cnstnt.regiterMailSubject, html).then((body) => {
					if (body) {
						return res.json({ code: code.ok, message: msg.sucessfullyRegister });
					}
					else {
						return res.json({ code: code.badRequest, message: msg.errorInUserRegistration })
					}
				})
			}).catch(err => { res.json({ code: code.internalError, message: msg.internalServerError }) })
		}
	})
}
// function cloudinaryImageUploader(req, res) {
//     req.newFile_name = [];
//     fileUtil.upload(req, res, async function (err) {
//         if (err) {
// 			return res.json({ code: code.badRequest, message:msg.internalServerError })
//         }
//         else {
// 			let multipleUpload = new Promise(async (resolve, reject) => {
//                 let upload_len = req.newFile_name.length
//                     , upload_res = new Array();
//                 await req.newFile_name.map(async (image) => {
//                     let filePath = image;
//                     await cloudinary.v2.uploader.upload(`${process.cwd()}/img/${filePath}`, async (error, result) => {
//                       if (result) {
//                             try {
// 								let response_unlink = await require('fs').unlink(`${process.cwd()}/img/${filePath}`);
// 								emoji_schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { image: result.url } }, { new: true }, (err, result1) => {
// 									if(err){console.log("error into update",err)}else{console.log("url updated",result1)}
// 								})
// 							 } catch (e) {
//                                 console.log('in callback')
//                             }
//                             upload_res.push(result.url);
//                         }
//                         if (upload_res.length === upload_len) {
//                             resolve(upload_res)
//                         } else if (error) {
//                             console.log(error)
//                             reject(error)
//                         }

//                     })
//                 })
// 			}).then((result) => result) .catch((error) => error)
// 			 let upload = await multipleUpload;
// 			return res.json({ code: code.ok, message: msg.imgageUpload, data: upload })
// 		}
// 	});
// }

function cloudinaryImageUploader(req, res) {
    req.newFile_name = [];
    fileUtil.upload(req, res, async function (err) {
        if (err) {
			return res.json({ code: code.badRequest, message:msg.internalServerError })
        }
        else {
			let multipleUpload = new Promise(async (resolve, reject) => {
                let upload_len = req.newFile_name.length
                    , upload_res = new Array();
                await req.newFile_name.map(async (image) => {
                    let filePath = image;
                    await cloudinary.v2.uploader.upload(`${process.cwd()}/img/${filePath}`, async (error, result) => {
                      if (result) {
						//   if(result.url != null)
						//   {
						// 	  console.log("...........................")
						// 	return res.json({ code: code.badRequest, message: msg.imgageUpdated})	
						//   }
                            try {
								let response_unlink = await require('fs').unlink(`${process.cwd()}/img/${filePath}`);
								console.log(">>>>>>>>>>>",result)
								
								emoji_schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { image: result.url } }, { new: true }, (err, result1) => {
									if(err){console.log("error into update",err)}
									else{
										console.log("url updated",result1)
									}

								})
							 } catch (e) {
                                console.log('in callback')
                            }
                            upload_res.push(result.url);
                        }
                        if (upload_res.length === upload_len) {
                            resolve(upload_res)
                        } else if (error) {
                            console.log(error)
                            reject(error)
						}
					
						// if(result1.image != null)
						// {
						// 	return res.json({ code: code.badRequest, message: msg.imgageUpload})	
						// }
						
				

						

                    })
                })
			}).then((result) => result) .catch((error) => error)
			
			 let upload = await multipleUpload;
			 console.log(">>>>>>>>>>>>>>result>>>>>>>>>>>>>>>>>>>")
			return res.json({ code: code.ok, message: msg.imgageUpload, data: upload })
		}
	});
	
}

function cloudinaryImageDelete(req, res) {
	emoji_schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { image:null } }, { new: true }).then((result) =>
	 {
		return res.json({ code: code.ok, message:msg.imageDeleted })
	}).catch(err => { res.json({ code: code.internalError, message: msg.internalServerError }) })
}


module.exports =
	{

		register,
		verifyPin,
		resendPin,
		login,
		forgotPassword,
		changePassword,
		editProfile,
		socialLogin,
		cloudinaryImageUploader,
		cloudinaryImageDelete

	}