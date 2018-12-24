var mongoose = require('mongoose')
var schema = mongoose.Schema({
	participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
	createdAt: { type: Date, default: Date.now },
	status: { type: String, enum: ['active', 'inactive'], default: 'active' },
	chatType: { type: String, enum: ['private', 'group'], default: 'private' },
	groupName: { type: String, required: function () { if (this.chatType == "group") return (this.chatType) ? true : false } },
	// function ()
	// {
	// if(chatType=="group")
	// {
	// 	return true;
	// }
	// else
	// {
	// 	return false;
	// 	// }
	// }


})
module.exports = mongoose.model('roomDetails', schema);


























