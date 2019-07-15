var mongoose = require('mongoose')
var bcrypt = require('bcryptjs');
var mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema({


	userName: { type: String, required: true },

	fullName: { type: String, required: true },

	gender: { type: String, enum: ['male', 'female'], default: 'male' },

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

	// password: {
	// 	type: String, required: function () {
	// 		return (this.socialId) ? false : true
	// 	}
	// },

	// pin: {
	// 	type: Number, required: function () {
	// 		return (this.socialId || this.role == 'ADMIN') ? false : true
	// 	}
	// },
	password: { type: String },

	pin: { type: String, default: '' },


	role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },


	isVerify: {
		type: Boolean, default: true
	},

	loginType: {
		type: String, enum: ['normal', 'social'], default: 'normal', required: function () {
			return (this.socialId) ? true : false
		}
	},

	socialId: {
		type: String, required: function () {
			return (this.loginType == "social") ? true : false
		}
	},

	subscription: [
		{
			id: {
				type: mongoose.Schema.Types.ObjectId, ref: "keyboardSchema"
			},
			purchaseAt:Date,
			expiry: Date
		}
	],
	// keyboardName: { type: mongoose.Schema.Types.ObjectId, ref: "keyboardSchema" },

	deviceType: { type: String, enum: ['ANDROID', 'IOS'], required: true },

	deviceId: { type: String, required: true },

	fcmToken: { type: String, required: true },

	isdCode: { type: String, require: true },

	image: { type: String, default: '' },

	status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },

	createdAt: { type: Date, default: Date.now }


});

schema.plugin(mongoosePaginate)
User = module.exports = mongoose.model('userSchema', schema);

User.countDocuments((async function (err, data) {
	// console.log(data)

	if (err) {
		console.log(err)
	}
	else if (!data) {
		let obj = {
			"userName": process.env.Username,
			"fullName": process.env.Fullname,
			"contactNumber": process.env.Phonenumber,
			"emailId": process.env.adminEmail,
			"password": process.env.adminPassword,
			"role": process.env.role,
			"image": process.env.defaultAdminImage,
			"deviceType": 'IOS',
			"deviceToken": 'A1d2m3i4N5',
			"deviceId": '16544544445fgfg54',
			"fcmToken": 'dfgf65ghyg76',
			"isdCode": "+91"

		};
		// console.log(obj)
		var hash = await bcrypt.hashSync(obj.password, 10);
		obj.password = hash;
		let user = new User(obj);
		user.save(function (err, data) {
			(err) ? console.log(err) : console.log("<==================Admin Created Sucessfully====================>")
		})
	}
	else {
		console.log("data", data)
	}
}))                                                                                                           
