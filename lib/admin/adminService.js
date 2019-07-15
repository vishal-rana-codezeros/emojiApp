var adminConst = require('./adminconstants')
var adminDao = require('./admindao')
var adminMapper = require('./adminMapper');
var keyboard_Schema = require('../schema/keyboard');
var category = require("../schema/category")
const mongoose = require('mongoose')


function getAllUser(req, res) {

	return adminDao.paginate(req).then(data => {
		if (data.docs.length == 0) {
			return { code: adminConst.CODE.NOTFOUND, message: adminConst.MESSAGE.noDataFound, data: data }
		}
		else {
			return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: data }
		}
	}).catch(err => {
		return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }
	})
}
function getOneUser(req, res) {

	let id = req.params.id;
	return adminDao.checkUser(id).then(data => {
		if (data) {
			return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: data }
		} else {
			return { code: adminConst.CODE.NOTFOUND, message: adminConst.MESSAGE.userNotFound }
		}
	}).catch(err => { ({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }) })
}
function updateUser(req, res) {
	let id = req.params.id;
	let obj = req.body;
	return adminDao.updateUserData(id, obj).then(data => {
		if (!data) {
			return { code: adminConst.CODE.NOTFOUND, message: adminConst.MESSAGE.userNotFound }
		}
		else {
			return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.editSuccess }
		}
	}).catch(err => console.log("errrrrrrr", err)({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }))
}
function setUserActivity(req, res) {

	let id = req.params.id;
	return adminDao.checkUser(id).then(data => {
		if (data) {
			if (data.status == "ACTIVE") {
				let obj = {};
				obj.status = 'INACTIVE'
				return adminDao.updateUserData(id, obj).then(result => {
					if (result) {
						return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.deleteUser }
					} else {
						return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }
					}
				}).catch(err => { return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError } })
			}
			else {
				let obj = {};
				obj.status = 'ACTIVE'
				return adminDao.updateUserData(id, obj).then(result => {
					if (result) {

						return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.activeUser }
					} else {
						return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }

					}
				}).catch(err => { return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError } })
			}
		}
		else {
			return { code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.userNotFound }
		}
	}).catch(err => { return ({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }) })
}
function recordCount(req, res) {

	let obj = {};
	obj.role = 'USER';
	return adminDao.getUsers(obj).then(data => {
		var totalCounts = data.length;
		var femaleCounts = 0;
		var maleCounts = 0;

		let countData = data.map(resp => {
			if (resp.gender == 'male') {
				maleCounts += 1;
				return maleCounts
			}
			else {
				femaleCounts += 1;
				return femaleCounts
			}

		})
		let obj1 = {
			"totalCounts": totalCounts,
			"maleCounts": maleCounts,
			"femalCounts": femaleCounts
		}
		return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: obj1 })
	})
}
function addAboutusPage(req, res) {
	console.log("into about us page")
	return adminMapper.allowCMSFields(req).then(response => {
		let obj = {}
		obj.type = 'aboutUs'
		return adminDao.getCMS(obj).then(data => {
			if (!data) {
				return adminDao.addCMS(response).then(resp => {
					return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.addCmsPage, data: resp }
				}).catch(err => { return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError } })
			}
			else {
				return { code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.aboutusAlredyAdded }
			}
		}).catch(err => { return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError } })
	}).catch(err => { return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError } })
}
function updateAboutusPage(req, res) {
	let id = req.params.id;
	let obj = {};
	obj.description = req.body.description;

	return adminDao.editCMS(id, obj).then(data => {
		if (data) {

			return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.editSuccess, data: data }
		} else {
			return res.json({ code: adminConst.CODE.NOTFOUND, message: adminConst.MESSAGE.noDataFound, data: [] })

		}
	}).catch(err => { ({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }) })

}
async function getcmsPage(req, res) {

	var { page_title } = req.query
	if (page_title == "about_us") {
		let obj = {}
		obj.type = 'aboutUs'
		return adminDao.getCMS(obj).then(data => {

			if (!data) {
				return { status: false, statusCode: adminConst.CODE.FAILURECASE, message: adminConst.MESSAGE.noDataFound, data: {} }
			}
			else {
				return { status: true, statusCode: adminConst.CODE.SUCCESSCASE, message: adminConst.MESSAGE.getUserData, data: data }
			}
		}).catch(err => { ({ status: false, statusCode: adminConst.CODE.FAILURECASE, message: adminConst.MESSAGE.internalServerError }) })
	}
	else if (page_title == "privacy_policy") {
		let obj = {}
		obj.type = 'privacy_policy'
		return adminDao.getCMS(obj).then(data => {

			if (!data) {
				return { status: false, statusCode: adminConst.CODE.FAILURECASE, message: adminConst.MESSAGE.noDataFound, data: {} }
			}
			else {
				return { status: true, statusCode: adminConst.CODE.SUCCESSCASE, message: adminConst.MESSAGE.getUserData, data: data }
			}
		}).catch(err => { ({ status: false, statusCode: adminConst.CODE.FAILURECASE, message: adminConst.MESSAGE.internalServerError }) })
	}
	else if (page_title == "terms_conditions") {
		let obj = {}
		obj.type = 'terms_conditions'
		return adminDao.getCMS(obj).then(data => {

			if (!data) {
				return { status: false, statusCode: adminConst.CODE.FAILURECASE, message: adminConst.MESSAGE.noDataFound, data: {} }
			}
			else {
				return { status: true, statusCode: adminConst.CODE.SUCCESSCASE, message: adminConst.MESSAGE.getUserData, data: data }
			}
		}).catch(err => { ({ status: false, statusCode: adminConst.CODE.FAILURECASE, message: adminConst.MESSAGE.internalServerError }) })
	}
	else {
		return res.json({ status: false, statusCode: adminConst.CODE.FAILURECASE, message: adminConst.MESSAGE.pageNotFound, data: {} })
	}
}

// function getAboutusPage(req, res) {
// 	let obj = {}
// 	obj.type = 'aboutUs'
// 	return adminDao.getCMS(obj).then(data => {

// 		if (!data) {
// 			return {code: adminConst.CODE.NOTFOUND, message: adminConst.MESSAGE.noDataFound, data: [] }
// 		}
// 		else {
// 			return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: data }
// 		}
// 	}).catch(err => { ({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }) })

// }

//---------------------------------------------------------------cms Pages api`s started-----------------------------------------------------------------------

function addprivacy_policy(req, res) {
	return adminMapper.allowprivacy_policyFields(req).then(response => {
		let obj = {}
		obj.type = 'privacy_policy'
		return adminDao.getCMS(obj).then(data => {
			if (!data) {
				return adminDao.addCMS(response).then(resp => {
					return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.addCmsPage, data: resp }
				}).catch(err => { return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError } })
			}
			else {
				return { code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.aboutusAlredyAdded }
			}
		}).catch(err => { return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError } })
	}).catch(err => { return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError } })
}
function updateprivacy_policy(req, res) {
	let id = req.params.id;
	let obj = {};
	obj.description = req.body.description;

	return adminDao.editCMS(id, obj).then(data => {
		if (data) {

			return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.editSuccess, data: data }
		} else {
			return res.json({ code: adminConst.CODE.NOTFOUND, message: adminConst.MESSAGE.noDataFound, data: [] })

		}
	}).catch(err => { ({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }) })

}
function getprivacy_policy(req, res) {
	let obj = {}
	obj.type = 'privacy_policy'
	return adminDao.getCMS(obj).then(data => {

		if (!data) {
			return { status: false, statusCode: adminConst.CODE.FAILURECASE, message: adminConst.MESSAGE.noDataFound, data: {} }
		}
		else {
			return { status: true, statusCode: adminConst.CODE.SUCCESSCASE, message: adminConst.MESSAGE.getUserData, data: data }
		}
	}).catch(err => { ({ status: false, statusCode: adminConst.CODE.FAILURECASE, message: adminConst.MESSAGE.internalServerError }) })

}


function add_terms_conditions(req, res) {
	return adminMapper.allow_terms_conditions(req).then(response => {
		let obj = {}
		obj.type = 'terms_conditions'
		return adminDao.getCMS(obj).then(data => {
			if (!data) {
				return adminDao.addCMS(response).then(resp => {
					return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.addCmsPage, data: resp }
				}).catch(err => { return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError } })
			}
			else {
				return { code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.aboutusAlredyAdded }
			}
		}).catch(err => { return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError } })
	}).catch(err => { return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError } })
}
function update_terms_conditions(req, res) {
	let id = req.params.id;
	let obj = {};
	obj.description = req.body.description;

	return adminDao.editCMS(id, obj).then(data => {
		if (data) {
			return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.editSuccess, data: data }
		} else {
			return res.json({ code: adminConst.CODE.NOTFOUND, message: adminConst.MESSAGE.noDataFound, data: [] })

		}
	}).catch(err => { ({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }) })
}
function get_terms_conditions(req, res) {
	let obj = {}
	obj.type = 'terms_conditions'
	return adminDao.getCMS(obj).then(data => {

		if (!data) {
			return { status: false, statusCode: adminConst.CODE.FAILURECASE, message: adminConst.MESSAGE.noDataFound, data: {} }
		}
		else {
			return { status: true, statusCode: adminConst.CODE.SUCCESSCASE, message: adminConst.MESSAGE.getUserData, data: data }
		}
	}).catch(err => { ({ status: false, statusCode: adminConst.CODE.FAILURECASE, message: adminConst.MESSAGE.internalServerError }) })

}

//---------------------------------------------------------------cms Pages endded-----------------------------------------------------------------------

async function addKeyboard(req, res) {

	let obj = {};
	obj = req.body
	console.log({obj})
	return adminDao.getKeyboard(req).then(data => {
		if (!data) {
			var data = new keyboard_Schema(req.body)
			data.createdBy = req.params.id
			if (req.body.keyboardType == "free") {
				data.cost = 0;
			}
			return adminDao.addKeyboard(data).then(resp => {
				return keyboard_Schema.findOne({ _id: data._id }).populate('categoryName').then((result1) => {
					return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.keyboardadded, data: result1 }
				})
			}).catch(err => {
				console.log({err})
				return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError}
			})
		}
		else {
			return { code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.aboutusAlredyAdded}
		}
	}).catch(err => { console.log("error", err);return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError} })
}
async function updateKeyboardDetails(req, res) {
	let update = {};
	let obj = req.body
	if (!obj.keyboardType) {
		await keyboard_Schema.findById({ _id: req.params.id }, (err, result) => {
			if (result) {
				obj.keyboardType = result.keyboardType
			}
			else {
				return res.json({ code: adminConst.CODE.NOTFOUND, message: adminConst.MESSAGE.noDataFound })
			}
		})
	}
	if (obj.keyboardType == "free") {
		obj.cost = 0
	} else {
		if (!obj.cost) {
			return res.json({ code: adminConst.CODE.NOTFOUND, message: adminConst.MESSAGE.paidcost })

		}
	}
	update['$set'] = obj;
	if (req.body.keyboardName) {
		keyboard_Schema.findOne({ "keyboardName": req.body.keyboardName, _id: { $ne: mongoose.Types.ObjectId(req.params.id) }, "status": "ACTIVE" }, (err, data) => {
			if (err) {
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
function setKeyboardActivity(req, res) {
	let id = req.params.id
	return adminDao.checKkeyboard(id).then((data) => {
		if (data) {
			if (data.status == "ACTIVE") {
				let obj = {}
				obj.status = "INACTIVE"
				return adminDao.updateKeyboard(id, obj).then(result => {
					if (result) {
						return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.inactiveKeyboard, data: result }
					} else {
						return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }
					}
				}).catch(err => { return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError } })

			}
			else {
				let obj = {}
				obj.status = "ACTIVE"
				return adminDao.updateKeyboard(id, obj).then(result => {
					if (result) {
						return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.activeKeyboard, data: result }
					} else {
						return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }
					}
				}).catch(err => { return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError } })
			}
		}
		else {
			return { code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.invalidData }
		}
	}).catch(err => { return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.invalidData }) })
}
async function getOneKeyboardDetails(req, res) {
	let id = req.params.id;

	return adminDao.checKkeyboard(id).then(data => {
		if (data) {
			return keyboard_Schema.findOne({ _id: data._id }).populate('categoryName').then((result1) => {
				return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: result1 }
			})
		} else {
			return { code: adminConst.CODE.NOTFOUND, message: adminConst.MESSAGE.invaliduser }
		}
	}).catch(err => { return ({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.noDataFound }) })
}
async function getAllKeyboardDetails(req, res) {
	console.log("into get all keyboad")
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
	]).then(data => {
		console.log("into length ", data.length)
		if (data.length == 0) {
			return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.noDataFound, data: [] })
		}
		else {
			console.log("into else", data)
			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: data })
		}

	}).catch(err => { return res.json({ code: adminConst.CODES.INTERNALSERVER, message: adminConst.MESSAGES.internalServerError }) })

}


function addCategory(req, res) {
	console.log(req.body)
	let query = {
		"categoryName": req.body.categoryName,
		"image": req.body.image,
		"description": req.body.image

	}
	return adminDao.getCategory(query).then((data) => {
		if (data) {
			return { code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.catAlreadyRegistered }
		}
		else {
			let obj = req.body
			obj.createdBy = req.params.id
			return adminDao.addCategory(obj).then((resp) => {
				return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.categoryAdded, data: resp }
			}).catch(err => { return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError } })
		}
	}).catch(err => { return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError } })
}
function getAllCategory(req, res) {

	return adminDao.paginate1(req).then(data => {

		if (data.docs.length == 0) {

			return { code: adminConst.CODE.NOTFOUND, message: adminConst.MESSAGE.noDataFound, data: data }
		}
		else {

			return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: data }
		}
	}).catch(err => {
		return ({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError })
	})
}
function getOneCategoryData(req, res) {

	let query = { _id: req.params.id }
	return adminDao.getCategory(query).then(data => {
		if (data) {
			return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: data }
		}
		else {
			return { code: adminConst.CODE.NOTFOUND, message: adminConst.MESSAGE.noDataFound }
		}
	}).catch(err => { ({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }) })
}
// function updateCategory(req, res) {
// 	let query = {
// 		"categoryName": req.body.categoryName
// 	}
// 	return adminDao.getCategory(query).then((data) => {
// 		if (data) {
// 			return res.json({ code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.categoryAlreadyRegistered })
// 		}
// 		else {
// 			let id = req.params.id
// 			let obj = req.body
// 			return adminDao.updateCategoryData(id, obj).then((resp) => {
// 				return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.editSuccess, data: resp })
// 			}).catch(err => { return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }) })
// 		}

// 	}).catch(err => { res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }) })
// }

function updateCategory(req, res) {
	let query = {
		"categoryName": req.body.categoryName
	}
	return adminDao.getCategory(query).then((data) => {
		console.log("into cat function", data)
		if (data) {
			return { code: adminConst.CODE.BADREQUEST, message: adminConst.MESSAGE.categoryAlreadyRegistered }
		}
		else {
			let id = req.params.id
			let obj = req.body
			return adminDao.updateCategoryData(id, obj).then((resp) => {
				if (!resp) {
					return { code: adminConst.CODE.NOTFOUND, message: adminConst.MESSAGE.noDataFound }
				}
				else {
					return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.editSuccess, data: resp }
				}
			}).catch(err => { return ({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }) })
		}
	}).catch(err => { ({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }) })
}
function deleteCategory(req, res) {
	console.log("req", req.params.id)
	let id = req.params.id
	let obj = {}
	obj.status = "INACTIVE"
	return adminDao.updateCategoryData(id, obj).then((data) => {
		if (!data) {
			return { code: adminConst.CODE.NOTFOUND, message: adminConst.MESSAGE.noDataFound }
		}
		else {
			let id = req.params.id
			let obj = {}
			obj.status = "INACTIVE"
			return adminDao.setCategoryActivity(id, obj).then(result => {
				if (result) {
					return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.CategoryDelete }
				} else {
					return { code: adminConst.CODE.NOTFOUND, message: adminConst.MESSAGE.noDataFound }
				}
			}).catch(err => { return ({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }) })
		}
	}).catch(err => { return ({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }) })
}
function activeCategory(req, res) {
	let id = req.params.id
	let obj = {}
	obj.status = "ACTIVE"
	return adminDao.updateCategoryData(id, obj).then((data) => {
		if (!data) {
			return { code: adminConst.CODE.NOTFOUND, message: adminConst.MESSAGE.noDataFound }
		}
		else {
			let id = req.params.id
			let obj = {}
			obj.status = "ACTIVE"
			return adminDao.setCategoryActivity(id, obj).then(result => {
				if (result) {
					return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.catActivate }
				} else {
					return { code: adminConst.CODE.NOTFOUND, message: adminConst.MESSAGE.noDataFound }
				}
			}).catch(err => { return { code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError } })

		}
	}).catch(err => { ({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }) })
}

function getActiveCatList(req, res) {

	let query = { status: "ACTIVE" }
	return adminDao.activeCategory(query).then(data => {
		if (data) {
			return { code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: data }
		}
		else {
			return { code: adminConst.CODE.NOTFOUND, message: adminConst.MESSAGE.noDataFound }
		}
	}).catch(err => { ({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }) })
}

// function getAllCategory(req, res) {

// 	return adminDao.paginate1(req).then(data => {

// 		if (data.docs.length == 0) {

// 			return res.json({ code: adminConst.CODE.NOTFOUND, message: adminConst.MESSAGE.noDataFound, data: data })
// 		}
// 		else {

// 			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: data })
// 		}
// 	}).catch(err => { return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError }) })
// }

function getImages(req, res) {

	let id = req.params.id
	let id1 = req.params.id1

	return adminDao.getImage(id1).then((result1) => {

		if (req.params.id == result1.categoryName) {

			return res.json({ code: adminConst.CODE.SUCCESS, message: adminConst.MESSAGE.getUserData, data: result1.subImages })

		}
		else {

			return res.json({ code: adminConst.CODE.INTERNALSERVER, message: adminConst.MESSAGE.internalServerError })

		}
	})
}
// function getImages(req, res) {
// 	let id = req.params.id
// 	let id1 = req.params.id1
// 	return keyboard_Schema.findOne({ _id: req.params.id1 }).then((result1) => {
// 		if (req.params.id == result1.categoryName) {
// 			return res.json({ msg: 'success', data: result1.image })

// 		}
// 		else {
// 			return res.json({ msg: 'No Data Found', data: [] })
// 		}
// 	})
// }
module.exports =
	{
		updateUser,
		getOneUser,
		getAllUser,
		setUserActivity,
		recordCount,

		addAboutusPage,
		updateAboutusPage,


		addKeyboard,
		updateKeyboardDetails,
		setKeyboardActivity,
		getAllKeyboardDetails,
		getOneKeyboardDetails,

		addCategory,
		updateCategory,
		deleteCategory,
		activeCategory,
		getOneCategoryData,
		getAllCategory,

		getActiveCatList,

		addprivacy_policy,
		updateprivacy_policy,


		add_terms_conditions,
		update_terms_conditions,
		getcmsPage,

		getImages
	}
