var emoji_schema = require('../schema/emojiapp')
var adminConst = require('./adminconstants')


function getAllUser(req, res) {
	var { page, size, filter } = req.query
	let query = {}
	query["role"] = "USER"
	let options = {}
	
	// options.skip = parseInt(size) * (parseInt(page)==0?0:parseInt(page)-1)
	options.offset = parseInt(size) * (parseInt(page))
	options.limit = parseInt(size)
	// options.offset = 5
	console.log(options)
	if (filter) {
		query["$or"] = [
			{
				"fullName": { $regex: filter, $options: 'i' }
			},
			{
				"emailId": { $regex: filter, $options: 'i' }
			}
		]
	}
	options.select = '_id userName fullName emailId contactNumber status loginType image'
	emoji_schema.paginate(query, options, (err, data) => {
		if (err) {
			console.log(err)
			return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError })
		}
		else {
			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: data })
		}
	})
}

function getOneUser(req, res) {

	emoji_schema.findById({ "_id": req.params.id }, '_id userName fullName emailId contactNumber status loginType image', (err, data) => {
		if (err) {
			return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.internalServerError })
		}
		else {
			console.log(data)
			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: data })
		}
	})
}
function updateUser(req, res) {
	let update = {};
	update['$set'] = req.body;

	emoji_schema.findOneAndUpdate({ "_id": req.params.id }, update, { new: true }, (err, data) => {
		if (err) {

			return res.json({ code: adminConst.CODE.INTRNLSRVRERR, message: adminConst.MESSAGE.internalServerError })
		}
		else {

			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.editSuccess })
		}

	})
}

function deleteUser(req, res) {
	emoji_schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { status: "INACTIVE" } }, (err, data) => {
		if (err) {

			return res.json({ code: adminConst.CODE.INTRNLSRVRERR, message: adminConst.MESSAGE.internalServerError })
		}
		else {

			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.deleteUser })
		}
	})
}

module.exports =
	{

		getAllUser,
		getOneUser,
		updateUser,
		deleteUser
		
		
	}