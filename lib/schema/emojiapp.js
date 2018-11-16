var mongoose = require('mongoose')
var schema = mongoose.Schema({
	Username:
	 { 
		type: String,required: true,
		length: {min: 3, max: 10},
	 },
	Fullname: 
	{ 
		type: String,required: true,
		length: {min: 3, max: 10},
	 },
	Phonenumber:
	{ 
		type: String,required: true,
		length: {min: 10, max: 15},
	 },
	Email: { type: String, unique: true,require },
	Password: { type: String,require },
	Pin: { type: Number },
	Socialid: {
		type: String, default: function () {
			return (this.isLogin) ? true : false
		}
	},
	// Logintype: {
	// 	type: String, enum: ['normal', 'social'], default: function () {
	// 		return (this.isLogin) ? true : false
	// 	}
	// },
	isLogin: {
		type: Boolean, default: function () {
			return (this.Socialid) ? true : false
		}
	},

});
module.exports = mongoose.model('emoji', schema);
                                                                                                              