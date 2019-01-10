var emoji_schema = require('../schema/emojiapp')
var adminConst = require('./adminconstants')
var cms_Schema = require('../schema/cmspages')
var keyboard_Schema = require('../schema/keyboard')
var category = require("../schema/category")
let mongoose = require("mongoose")


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

function getAllUser(req, res) {
	var { page, size, filter } = req.query
	let query = {}
	query["role"] = "USER"
	let options = {}
	options.offset = parseInt(size) * (parseInt(page))
	options.limit = parseInt(size)
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

			return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.noRecordsFound, data: data })
		}
		else {
			console.log(",,,,", data.docs.length)
			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: data })
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
		}
	})
}

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
		else if (!data) {
			return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.noDataFound, data: [] })
		}
		else {

			console.log(data)
			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: data })
		}
	})
}


function addKeyboard(req, res) {
	keyboard_Schema.findOne({ "keyboardName": req.body.keyboardName, "categoryName": req.body.categoryName }).then((result) => {
		if (!result) {
			var data = new keyboard_Schema(req.body)
			console.log("into body parts ", req.body)
			data.createdBy = req.params.id
			if (req.body.keyboardType == "free") {
				data.cost = 0;
			}
			data.save((err, data1) => {
				if (err) {
					console.log("into error ", err)
					return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.requireField })
				}
				else {

					keyboard_Schema.findOne({ _id: data1._id }).populate('categoryName').then((result1) => {
						result1.category
						return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.keyboardadded, data: result1 })
					})
				}
			})
		} else {
			return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.keyboardAlreadyRegistered })
		}
	})
}

// function addKeyboard(req, res) {
// 	keyboard_Schema.findOne({ "keyboardName": req.body.keyboardName }).then(async (result) => {
// 		if (result) {
// 			return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.keyboardAlreadyRegistered })
// 		}
// 		else {
// 			// category.findOne({"category":req.params.body}).then((resp) =>{
// 			// 	if(resp)
// 			// 	{
// 			var data = new keyboard_Schema(req.body)
// 			console.log("into body parts ", req.body)
// 			data.createdBy = req.params.id
// 			if (req.body.keyboardType == "free") {
// 				data.cost = 0;
// 			}

// 			console.log(">>>>>>>else>>>>>>>>>>>>")
// 			data.save((err, data) => {
// 				if (err) {
// 					console.log("into error ", err)
// 					return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.requireField })
// 				}
// 				else {
// 					return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.keyboardadded, data: data })
// 				}
// 			})

// 		}
// 	})
// }

async function updateKeyboardDetails(req, res) {
	let update = {};
	let obj = req.body
	if (!obj.keyboardType) {
		await keyboard_Schema.findById({ _id: req.params.id }, (err, result) => {
			if (result) {
				obj.keyboardType = result.keyboardType
			}
			else {
				return res.json({ code: 404, message: "no such key board found" })
			}
		})
	}
	if (obj.keyboardType == "free") {
		obj.cost = 0
	} else {
		if (!obj.cost) {
			return res.json({ code: 404, message: "Please add cost for paid service." })
		}
	}// let {keyboardType,status,image,cost,keyboardName,category} = req.body
	update['$set'] = obj;
	if (req.body.keyboardName) {
		console.log("search by keyboardname===================================================>")
		keyboard_Schema.findOne({ "keyboardName": req.body.keyboardName, _id: { $ne: mongoose.Types.ObjectId(req.params.id) }, "status": "ACTIVE" }, (err, data) => {
			if (err) {
				console.log("err", err)
				return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError })
			} else if (data) {
				return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.keyboardAlreadyRegistered })
			} else {
				keyboard_Schema.findOneAndUpdate({ "_id": mongoose.Types.ObjectId(req.params.id) }, update, { new: true }, (err, data) => {
					if (err) {
						return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError })
					}
					else {
						return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.editSuccess, data: data })
					}
				})
			}
		})
	}
	else {
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

function deleteKeyboard(req, res) {

	keyboard_Schema.findOneAndUpdate({ "_id": req.params.id }, { $set: { status: "INACTIVE" } }, (err, data) => {

		if (err) {

			return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.invaliduser })
		}
		else {

			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.inactiveKeyboard })
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

			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.catActivate })
		}
	})
}

function getOneKeyboardDetails(req, res) {


	keyboard_Schema.findById({ "_id": req.params.id }, (err, data) => {
		if (err) {
			return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.noDataFound })
		}
		else {
			keyboard_Schema.findOne({ _id: data._id }).populate('categoryName').then((result1) => {
				result1.category
				return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.keyboardadded, data: result1 })
			})
		}
	})
}
function getAllKeyboardDetails(req, res) {
	var { page, size, filter } = req.query
	let query = {}
	let options = {}
	options.offset = parseInt(size) * (parseInt(page))
	options.limit = parseInt(size)
	if (filter) {
		query["$or"] = [
			{
				"keyboardName": { $regex: filter, $options: 'i' }
			},
			{
				"keyboardType": { $regex: filter, $options: 'i' }
			}
		]
	}


	keyboard_Schema.aggregate([
		{
			$match: query,
		},
		{
			'$facet': {
				metadata: [{ $count: "total" }, { $addFields: { page: parseInt(page), offset: options.offset } }],
				data: [{ $skip: options.offset }, { $limit: options.limit }]
			}
		},
		{
			$unwind: "$data"
		},
		{
			$lookup: {
				from: "categoryschemas",
				localField: "data.categoryName",
				foreignField: "_id",
				as: "data.categoryDetails"
			}
		},
		{
			$unwind: "$data.categoryDetails"
		},
		{
			$addFields: {
				"data.categoryName": "$data.categoryDetails.categoryName",
			}
		}
		, {
			$project: {
				"data.categoryDetails": false,
			}
		}, {
			$group: {
				_id: "$metadata",
				details: { $push: "$data" }
			}
		}
	])
		.then(data => {
			if (data.length == 0) {
				return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.noDataFound, data: [] })
			}
			else {
				console.log("into else", data)
				return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: data })
			}

		}).catch(err => { res.json({ code: adminConst.CODES.INTERNALSERVER, message: adminConst.MESSAGES.internalServerError }) })

}

function addCategory(req, res) {
	category.findOne({ "categoryName": req.body.categoryName }).then(async (result) => {
		if (result) {
			return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.catAlreadyRegistered })
		}
		else {
			var data = new category(req.body)
			data.createdBy = req.params.id
			data.save((err, data) => {
				if (err) {
					console.log("error into addcategory", err)
					return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError })

				}
				else {
					return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.categoryAdded, data: data })
				}
			})
		}
	})
}


function updateCategory(req, res) {
	let update = {};
	let obj = req.body
	update['$set'] = obj;
	if (req.body.categoryName) {

		category.findOne({ "categoryName": req.body.categoryName, _id: { $ne: mongoose.Types.ObjectId(req.params.id) } }, (err, data) => {
			if (err) {
				console.log("err", err)
				return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError })
			} else if (data) {
				return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.categoryAlreadyRegistered })
			} else {
				category.findOneAndUpdate({ "_id": mongoose.Types.ObjectId(req.params.id) }, update, { new: true }, (err, data) => {
					if (err) {
						return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError })
					}
					else {
						return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.editSuccess, data: data })
					}
				})
			}
		})
	}


}

// function updateCategory(req, res) {
// 	let update = {};
// 	update['$set'] = req.body;

// 	category.findOneAndUpdate({ "_id": req.params.id }, update, { new: true }, (err, data) => {
// 		if (err) {

// 			return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError })
// 		}
// 		else {

// 			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.editSuccess, data: data })
// 		}
// 	})
// }

function deleteCategory(req, res) {
	category.findOneAndUpdate({ "_id": req.params.id }, { $set: { status: "INACTIVE" } }, (err, data) => {
		if (err) {
			return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError })
		}
		else {
			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.CategoryDelete })
		}

	})
}

function activeCategory(req, res) {
	category.findOneAndUpdate({ "_id": req.params.id }, { $set: { status: "ACTIVE" } }, (err, data) => {
		if (err) {

			return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.noDataFound })
		}
		else {

			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.catActivate })
		}
	})
}

function getOneCategoryData(req, res) {
	let options = {}
	category.findOne({ "_id": req.params.id }, '_id status categoryName createdBy', (err, data) => {
		if (err) {
			return res.json({ code: adminConst.CODE.internalServerError, message: adminConst.MESSAGE.noDataFound })
		}
		else {
			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: data })
		}

	})

}

function getAllCategory(req, res) {
	var { page, size, filter } = req.query
	let query = {}
	let options = {}
	options.offset = parseInt(size) * (parseInt(page))
	options.limit = parseInt(size)
	if (filter) {
		query["$or"] = [
			{
				"category": { $regex: filter, $options: 'i' }
			},
			{
				"status": { $regex: filter, $options: 'i' }
			}
		]
	}
	options.select = '_id status categoryName createdBy'
	category.paginate(query, options, (err, data) => {
		if (err) {
			console.log(err)
			return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError })
		}
		else if (data.docs.length == 0) {

			return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.noDataFound, data: data })
		}
		else {
			console.log(",,,,", data.docs.length)
			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: data })
		}
	})
}

function getActiveCatList(req,res)
{
	category.findOne({"status":"ACTIVE"}, '_id status categoryName createdBy', (err, data) => {
		if (err) {
			return res.json({ code: adminConst.CODE.internalServerError, message: adminConst.MESSAGE.noDataFound })
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
		getOneKeyboardDetails,
		addCategory,
		updateCategory,
		deleteCategory,
		activeCategory,
		getOneCategoryData,
		getAllCategory,
		getActiveCatList
	}