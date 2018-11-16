// console.log("Into UserService")
var emoji_schema = require('../schema/emojiapp')
var nodeMailer = require('nodemailer')
var securePin = require("secure-pin");
var accountSid = 'ACffbfbd1157bb9483f5468c170e724068';
const authToken = 'b90802d6d9bc7524feba86ea00c3a24f';
const client = require('twilio')(accountSid, authToken);
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = 'this_is-a-secret';


function register(req, res) {
	console.log("in action=======================")
	var user = new emoji_schema(req.body)
	var pin = securePin.generatePinSync(4);
	user.Pin = pin;
	user.Password = bcrypt.hashSync(req.body.Password, 10);
	// user.Password = hash;
	user.save(async (err, body) => {
		if (err) {
			console.log(err)
			return res.json({ code: 500, message: "internal server error" })
		}
		else {
			client.messages.create
				({
					body: `Thanks For Registration:- ${pin}`,
					from: '+13192468750',
					// to: '+918200268488'
					to: '+917874814195'
				})
				.then(message => console.log(message.sid))
				.done();
			const transporter = nodeMailer.createTransport({
				host: 'smtp.gmail.com',
				port: 465,
				secure: true,  //true for 465 port, false for other ports
				auth:
				{
					user: 'codezerostrainee@gmail.com',
					pass: 'codezeros123'
				}
			});
			const mailOptions =
			{
				from: '"Codezeros" <codezerostrainee@gmail.com>', // sender address
				to: 'prem.makvana@codezeros.com', // list  of receivers
				subject: 'Test Mail ', // Subject line
				text: 'This mail is for tesing purpose', // plain text body
				html: `<b>Your Pin Number Is:-</b><h1>${pin}</h1>` // html body
			};
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error);
					return res.json({ code: 500, message: "error" });
				}
				else {
					console.log("info", info);
					return res.json({ code: 200, message: "success" });
				}
			});
		}
	})
}
function verifyPin(req, res) {
	emoji_schema.findById({ "_id": req.params.id }, (err, data) => {
		if (err) {
			return res.json({ code: 500, msg: "Internal Server Error" })
		}
		else if (req.body.Pin == data.Pin) {
			return res.json({ code: 200, msg: "Pin Verifield Sucessfully", data })
		}
		else {
			return res.json({ code: 500, msg: "can`t Verifield", err })
		}


	})
}
function resendPin(req, res) {

	var user = new emoji_schema(req.body)
	var pin = securePin.generatePinSync(4);
	user.Pin = pin;


	client.messages.create
		({
			body: `Your Pin Number is:- ${pin}`,
			from: '+13192468750',
			// to: '+918200268488'
			to: '+917874814195'
		})
		.then(message => console.log(message.sid))
		.done();
	const transporter = nodeMailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,  //true for 465 port, false for other ports
		auth:
		{
			user: 'codezerostrainee@gmail.com',
			pass: 'codezeros123'
		}
	});
	const mailOptions =
	{
		from: '"Codezeros" <codezerostrainee@gmail.com>', // sender address
		to: 'prem.makvana@codezeros.com', // list  of receivers
		subject: 'Test Mail ', // Subject line
		text: 'This mail is for tesing purpose', // plain text body
		html: `<b>Your Pin Number Is:-</b><h1>${pin}</h1>` // html body
	};
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			return res.json({ code: 500, message: "error" });
		}
		else {
			console.log("info", info);
			return res.json({ code: 200, message: "success" });
		}
	});
}


async function login(req, res) {
	emoji_schema.findOne({ "Email": req.body.email }, async (err, data) => {
		if (err) {
			console.log(err)
			return res.json("Error in Login")
		}
		else {
			const match = await bcrypt.compare(req.body.password, data.Password);
			console.log(req.body.password)
			if (match) {

				console.log(data)

				const token = await jwt.sign({ Phonenumber: data.Phonenumber, id: data._id }, secret, { expiresIn: 60 * 60 });

				console.log("data in node", data._id)
				return res.json({ code: 200, msg: "login successfully", data: data, token: token })
			}
			else {
				return res.json({ code: 500, msg: "Unauthorized user" })
			}

		}
	})
}
function forgotPassword(req, res) {
	emoji_schema.findOne({ "Email": req.body.email }, (err, data) => {
		if (err) {
			console.log(err)
		}
		else if (data) {
			var user = new emoji_schema(req.body)
			var pin = securePin.generatePinSync(4);
			user.Pin = pin;


			client.messages.create
				({
					body: `Thanks For Registration:- ${pin}`,
					from: '+13192468750',
					// to: '+918200268488'
					to: '+917874814195'
				})
				.then(message => console.log(message.sid))
				.done();
			const transporter = nodeMailer.createTransport({
				host: 'smtp.gmail.com',
				port: 465,
				secure: true,  //true for 465 port, false for other ports
				auth:
				{
					user: 'codezerostrainee@gmail.com',
					pass: 'codezeros123'
				}
			});
			const mailOptions =
			{
				from: '"Codezeros" <codezerostrainee@gmail.com>', // sender address
				to: 'prem.makvana@codezeros.com', // list  of receivers
				subject: 'Test Mail ', // Subject line
				text: 'This mail is for tesing purpose', // plain text body
				html: `<b>Your Pin Number Is:-</b><h1>${pin}</h1>` // html body
			};
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error);
					return res.json({ code: 500, message: "error" });
				}
				else {
					console.log("info", info);
					return res.json({ code: 200, message: "success" });
				}
			});
		}
		else {
			console.log("not found")
			return res.json({ code: 500, message: "Not Found" });
		}
	})
}
function changePassword(req, res) {
	var oldpass = bcrypt.hashSync(req.body.oldpassword, 10);
	let newpass = bcrypt.hashSync(req.body.newpassword, 10);
	console.log("old password", oldpass)
	emoji_schema.findOne({ "_id": req.params.id }, (err, data) => {
		{
			if (err) {
				console.log(err)
				return res.json({ code: 500, message: "error" });
			}



			else if (data) {
				console.log("data", data)
				// console.log("dbpass",data.Password)
				// console.log("bodypass",oldpass)
				//console.log("compare",oldpass == data.Password)
				console.log("in data")
				var match = bcrypt.compare(req.body.oldpassword, data.Password, (err, result) => {
					if (err) {
						console.log(err)
					}
					else {
						console.log("rslt", result)
						if (result == true) {
							console.log(true)
							emoji_schema.findOneAndUpdate({ _id: data._id }, { $set: { Password: newpass } }, (err, data) => {

								console.log("into update querty", data)
								if (err) {
									console.log("Error Into Change Password", err)
									return res.json({ code: 500, message: "error" });
								}
								else {
									console.log("Password Updated Sucessfully ", data)
									return res.json({ code: 200, message: "Password Updated Sucessfully" });
								}
							})
						}
						else {
							console.log(false)
							return res.json({ code: 500, message: "Error Into Change Password" });
						}
					}
				})

				// if (bcrypt.compare(req.body.oldpassword, data.Password ) == true)
				// {
				// 	console.log("True")
				// emoji_schema.findOneAndUpdate({_id:data._id},{$set:{Password:newpass}},(err,data)=>
				// 	{
				// 		console.log("into update querty",data)
				// 		if(err)
				// 		{
				// 			console.log("Error in Change Password",err)
				// 			return res.json({ code: 500, message: "error" });
				// 		}
				// 		else
				// 		{
				// 			console.log("Password Updated Sucessfully ",data)
				// 			return res.json({ code: 200, message: "Password Updated Sucessfully" });
				// 		}

				// 	})

				// }


			}

		}
	})
}
function editProfile(req, res) {
	emoji_schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { Username: req.body.username, Fullname: req.body.fullname } }, (err, data) => {
		if (err) {
			console.log("Error in Updation")
		}
		else { console.log("updated") }
		return res.json({ code: 200, message: "Updated Sucessfully", data });

	})
}

function socialLogin(req, res) {
	console.log("Into socialLoggin Page")
	emoji_schema.findOne({ "Email": req.body.Email }, async (err, data) => {
		console.log("Into socialLoggin Page",data)
		if (err) {
			console.log(err)
			return res.json("Error in Login")
		}
		else if (data) {
			const match = await bcrypt.compare(req.body.Password, data.Password);
			console.log(req.body.password)
			if (match) {

				console.log(data)

				const token = await jwt.sign({ Phonenumber: data.Phonenumber, id: data._id }, secret, { expiresIn: 60 * 60 });

				console.log("data in node", data._id)
				return res.json({ code: 200, msg: "login successfully", data: data, token: token })
				exit();
			}
			else {
				return res.json({ code: 500, msg: "Unauthorized user" })
			}
		}
		else {
			var user = new emoji_schema(req.body)
			var pin = securePin.generatePinSync(4);
			user.Pin = pin;
			user.Password = bcrypt.hashSync(req.body.Password, 10);
			// user.Password = hash;
			user.save(async (err, body) => {
				if (err) {
					console.log(err)
					return res.json({ code: 500, message: "internal server error" })
				}
				else {
					client.messages.create
						({
							body: `Thanks For Registration:- ${pin}`,
							from: '+13192468750',
							// to: '+918200268488'
							to: '+917874814195'
						})
						.then(message => console.log(message.sid))
						.done();
					const transporter = nodeMailer.createTransport({
						host: 'smtp.gmail.com',
						port: 465,
						secure: true,  //true for 465 port, false for other ports
						auth:
						{
							user: 'codezerostrainee@gmail.com',
							pass: 'codezeros123'
						}
					});
					const mailOptions =
					{
						from: '"Codezeros" <codezerostrainee@gmail.com>', // sender address
						to: 'prem.makvana@codezeros.com', // list  of receivers
						subject: 'Test Mail ', // Subject line
						text: 'This mail is for tesing purpose', // plain text body
						html: `<b>Your Pin Number Is:-</b><h1>${pin}</h1>` // html body
					};
					transporter.sendMail(mailOptions, (error, info) => {
						if (error) {
							console.log(error);
							return res.json({ code: 500, message: "error" });
						}
						else {
							console.log("info", info);
							return res.json({ code: 200, message: "success" });
						}
					});
				}
			})
			// console.log("Into Registration Page",data)
			// var user = new emoji_schema(req.body)
			// var pin = securePin.generatePinSync(4);
			// user.Pin = pin;


			// client.messages.create
			// 	({
			// 		body: `Your Pin Number is:- ${pin}`,
			// 		from: '+13192468750',
			// 		// to: '+918200268488'
			// 		to: '+917874814195'
			// 	})
			// 	.then(message => console.log(message.sid))
			// 	.done();
			// const transporter = nodeMailer.createTransport({
			// 	host: 'smtp.gmail.com',
			// 	port: 465,
			// 	secure: true,  //true for 465 port, false for other ports
			// 	auth:
			// 	{
			// 		user: 'codezerostrainee@gmail.com',
			// 		pass: 'codezeros123'
			// 	}
			// });
			// const mailOptions =
			// {
			// 	from: '"Codezeros" <codezerostrainee@gmail.com>', // sender address
			// 	to: 'prem.makvana@codezeros.com', // list  of receivers
			// 	subject: 'Test Mail ', // Subject line
			// 	text: 'This mail is for tesing purpose', // plain text body
			// 	html: `<b>Your Pin Number Is:-</b><h1>${pin}</h1>` // html body
			// };
			// transporter.sendMail(mailOptions, (error, info) => {
			// 	if (error) {
			// 		console.log(error);
			// 		return res.json({ code: 500, message: "error" });
			// 	}
			// 	else {
			// 		console.log("info", info);
			// 		return res.json({ code: 200, message: "success" });
			// 	}
			// });
		}


	})
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
		socialLogin

	}