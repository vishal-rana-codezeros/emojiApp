var mongoose = require('mongoose')
var bcrypt = require('bcrypt');
var schema = mongoose.Schema({
	userName: { type: String, required: true },


	fullName: { type: String, required: true },


	contactNumber: {
		type: String, required: function () {
			return (this.socialId) ? false : true
		}
	},

	emailId: {
		type: String, required: function () {
			return (this.socialId) ? false : true
		}
	},


	password: {
		type: String, required: function () {
			return (this.socialId) ? false : true
		}
	},


	pin: {
		type: Number, required: function () {
			return (this.socialId || this.role == 'ADMIN') ? false : true
		}
	},
	// pin: { type: Number },

	socialId: {
		type: String, required: function () {
			return (this.isLogin) ? true : false
		}
	},

	role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },

	isLogin: {
		type: Boolean, required: function () {
			return (this.socialId) ? true : false
		}
	},

	isVerify: {
		type: Boolean, default: false
	},

	loginType: {
		type: String, enum: ['normal', 'social'], default: 'normal', required: function () {
			return (this.isLogin) ? true : false
		}
	},


	deviceType: { type: String, enum: ['ANDROID', 'IOS'], required: true },

	deviceToken: { type: String, required: true },


	image: { type: String },

});

User = module.exports = mongoose.model('emoji', schema);

User.countDocuments((function (err, data) {
	if (err) {
		console.log(err)
	}
	else if (!data) {
		let obj = {
			"userName": process.env.Username,
			"fullName": process.env.Fullname,
			"contactNumber": process.env.Phonenumber,
			"emailId": process.env.Email,
			"password": process.env.Password,
			"role": process.env.role,
			"deviceType": 'IOS',
			"deviceToken": 'HFVGHVJB'
		};
		var hash = bcrypt.hashSync(obj.password, 10);
		obj.password = hash;
		let user = new User(obj);
		user.save(function (err, data) {
			(err) ? console.log(err) : console.log("<==================Admin Created Sucessfully====================>")
		})// console.log("object result", obj)
	}
	else {
		console.log("data", data)
	}
}))                                                                                                           