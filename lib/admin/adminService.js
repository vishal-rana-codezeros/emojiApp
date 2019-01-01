var emoji_schema = require('../schema/emojiapp')
var adminConst = require('./adminconstants')
var cms_Schema = require('../schema/cmspages')
var keyboard_Schema = require('../schema/keyboard')

function getAllUser(req, res) {
	var { page, size, filter } = req.query
	let query = {}
	query["role"] = "USER"
	let options = {}

	// options.skip = parseInt(size) * (parseInt(page)==0?0:parseInt(page)-1)
	options.offset = parseInt(size) * (parseInt(page))
	options.limit = parseInt(size)
	// options.offset = 5

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
	options.select = '_id userName fullName emailId contactNumber status loginType uimage'
	emoji_schema.paginate(query, options, (err, data) => {

		if (err) {
			console.log(err)
			return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError })
		}
		else if (data.docs.length == 0) {

			return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.noRecordsFound })
		}
		else {
			console.log(",,,,", data.docs.length)
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
			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: data })
		}
	})
}

function updateUser(req, res) {
	let update = {};
	update['$set'] = req.body;

	emoji_schema.findOneAndUpdate({ "_id": req.params.id }, update, { new: true }, (err, data) => {
		if (err) {

			return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError })
		}
		else {

			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.editSuccess })
		}

	})
}

function deleteUser(req, res) {
	emoji_schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { status: "INACTIVE" } }, (err, data) => {
		if (err) {

			return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.invaliduser })
		}
		else {

			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.deleteUser })
		}
	})
}

function activeUser(req, res) {
	emoji_schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { status: "ACTIVE" } }, (err, data) => {
		if (err) {

			return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.invaliduser })
		}
		else {

			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.activeUser })
		}
	})
}

function recordCount(req, res) {
	emoji_schema.find({ "role": "USER" }, function (err, data) {
		console.log(">>>>>>>>>>>>.", data)
		if (err) {
			return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError })
		}
		else {
			var totalCounts = data.length;
			var femaleCounts = 0;
			var maleCounts = 0;

			let countData = data.map(resp => {
				if (resp.gender == 'male') {
					maleCounts += 1;
					return maleCounts
				} else {
					femaleCounts += 1;
					return femaleCounts
				}

			})
			let obj = {
				"totalCounts": totalCounts,
				"maleCounts": maleCounts,
				"femalCounts": femaleCounts
			}
			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.totalRecords, data: obj })
			// console.log("COUNTSARAT", obj);
		}
	})
}

// function addAboutusPage(req, res) {

// 	var cms = new cms_Schema(req.body)
// 	cms.type = "aboutUs"
// 	cms.createdBy = req.params.id
// 	cms_Schema.find({}, (err, data) => {

// 		if (data.length == 0) {
// 			cms.save((err, data) => {

// 				if (err) {
// 					return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError })
// 				}

// 				else {
// 					return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.addCmsPage, data: data })
// 				}
// 			})
// 		}
// 		else if (data.length > 0) {
// 			return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.aboutusAlredyAdded })
// 		}
// 	})
// }

function addAboutusPage(req, res) {

	var cms = new cms_Schema(req.body)
	cms.type = "aboutUs"
	cms.createdBy = req.params.id
	cms_Schema.findOne({ type: "aboutUs" }, (err, data) => {
		console.log(">>>>>>>>", data)
		if (err) {

		} else if (!data) {
			cms.save((err, data1) => {

				if (err) {
					return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError })
				}

				else {
					return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.addCmsPage, data: data1 })
				}
			})
		} else {
			return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.aboutusAlredyAdded })
		}

	})
}

function updateAboutusPage(req, res) {
	let update = {};
	update['$set'] = req.body;

	cms_Schema.findOneAndUpdate({ "_id": req.params.id }, update, { new: true }, (err, data) => {
		if (err) {

			return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError })
		}
		else {

			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.editSuccess, data: data })
		}

	})



}

function getAboutusPage(req, res) {

	cms_Schema.findOne({ type: "aboutUs" }, 'title description createdBy', (err, data) => {
		if (err) {
			return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.internalServerError })
		}
		else {
			console.log(data)
			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: data })
		}
	})
}

function addKeyboard(req, res) {
	keyboard_Schema.findOne({ "keyboardName": req.body.keyboardName }).then(async (result) => {
	if (result) {
		return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.keyboardAlreadyRegistered })
	}
	else {
			if (req.body.KeyboardType == 'paid' && (!req.body.cost)) {
				return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.requireField })
			}
			else if (req.body.keyboardType == 'free' && (req.body.cost)) {


				return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.invalidData })
			}

			else {
			
				var data = new keyboard_Schema(req.body)
				data.createdBy = req.params.id
				if (req.body.KeyboardType == "free") {
					data.cost = 0;
				}
			
				console.log(">>>>>>>else>>>>>>>>>>>>")
				data.save((err, data) => {
					if (err) {
						return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.requireField })
					}
					else {
						return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.keyboardadded, data: data })
					}
				})
			}
		}
	})
}



function updateKeyboardDetails(req, res) {
	let update = {};
	update['$set'] = req.body;
	keyboard_Schema.findOne({ "keyboardName": req.body.keyboardName }).then(async (result) => {
		if (result) {
			return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.keyboardAlreadyRegistered })
		}
		else {
			if (req.body.keyboardType == 'paid' && (!req.body.cost)) {
				return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.requireField })
			}
			else if (req.body.keyboardType == 'free' && (req.body.cost)) {
				return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.invalidData })
			}
			else {
				console.log("type", req.body.keyboardType)
				keyboard_Schema.findOneAndUpdate({ "_id": req.params.id }, update, { new: true }, (err, data) => {
					if (err) {

						return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError })
					}
					else {

						return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.editSuccess, data: data })
					}

				})
			}


		}
	})
}
function deleteKeyboard(req, res) {
	keyboard_Schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { status: "INACTIVE" } }, (err, data) => {

		if (err) {

			return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.invaliduser })
		}
		else {

			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.deleteUser })
		}
	})

}

function activeKeyboard(req, res) {
	console.log("into active keyboard")
	keyboard_Schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { status: "ACTIVE" } }, (err, data) => {
		if (err) {

			return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.invaliduser })
		}
		else {

			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.activeUser })
		}
	})
}
function getAllKeyboardDetails(req, res) {
	keyboard_Schema.find({}, (err, data) => {
		if (err) {
			return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.internalServerError })
		}
		else {
			console.log(data)
			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: data })
		}
	})

}
function getOneKeyboardDetails(req, res) {

	keyboard_Schema.findById({ "_id": req.params.id }, (err, data) => {
		if (err) {
			return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.internalServerError })
		}
		else {
			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: data })
		}
	})
}

module.exports =
	{
		getAllUser,
		getOneUser,
		updateUser,
		deleteUser,
		activeUser,
		recordCount,
		addAboutusPage,
		updateAboutusPage,
		getAboutusPage,
		addKeyboard,
		updateKeyboardDetails,
		deleteKeyboard,
		activeKeyboard,
		getAllKeyboardDetails,
		getOneKeyboardDetails


	}