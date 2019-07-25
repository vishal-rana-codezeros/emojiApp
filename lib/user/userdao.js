let mongoose = require("mongoose")
var emoji_schema = require('../schema/emojiapp')
var keyBoardSchema = require('../schema/keyboard')
var cms_Schema = require('../schema/cmspages')
var category_schema = require("../schema/category")
var contactUsSchema = require("../schema/contactUs")
let transactionModel = require('../schema/transactionModel');
const constant = require('../constant');

function registerUser(obj) {
    let user = new emoji_schema(obj);
    return user.save(user)
}
function getUserData(id) {
    let query = {
        _id: id
    }
    return emoji_schema.findById(query)
}

function updateData(id, obj) {
    let query = {
        _id: id
    }

    let update = {}
    update['$set'] = obj;

    let option = {}
    option.new = true
    return emoji_schema.findOneAndUpdate(query, update, option)
}
function updateData1(id, obj) {

    let query = {
        emailId: id
    }

    let update = {}
    update['$set'] = obj;

    let option = {}
    option.new = true
    return emoji_schema.findOneAndUpdate(query, update, option)
}
function updateData2(id, obj) {
    let query = {
        contactNumber: id
    }

    let update = {}
    update['$set'] = obj;

    let option = {}
    option.new = true
    return emoji_schema.findOneAndUpdate(query, update, option)
}
async function getUser(id) {
    let query = {
        emailId: id
    }
    let result_output = await emoji_schema.findOne(query).exec();
    // console.log("into user dao",result_output);
    return result_output;
}
async function getUserContactNum(id, id1) {
    let query = {
        contactNumber: id,
        isdCode: id1
    }
    let result_output = await emoji_schema.findOne(query).exec();
    return result_output;
}
function getUserData(id) {
    let query = {
        _id: id
    }
    return emoji_schema.findOne(query)
}
function socialId(id) {
    let query = {
        socialId: id
    }
    return emoji_schema.findOne(query)
}
function getContactUsPage(obj) {
    return contactUsSchema.findOne(obj, '_id subject message ');
}
function addContactUs(obj) {
    let ContactUs = new contactUsSchema(obj);
    return ContactUs.save(ContactUs)
}

function getImage(id1) {
    let query = {
        _id: id1
    }
    return keyBoardSchema.findOne(query)
}
function paginate1(req) {
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
    options.select = '_id status categoryName image createdBy'
    return category_schema.paginate(query, options);
}

/**
 * 
 * @param {*} transactionObj, transaction obj to initialize the process 
 */
function createTransaction(transactionObj) {
    let transObj = new transactionModel(transactionObj);
    return transObj.save().then(result => result);
}

/**
 * 
 * @param {*} transactionId , id of the ongoing transaction
 */
function fetchTransactionFromId(transactionId) {
    let query = {};
    query["_id"] = transactionId;
    query["paymentStatus"] = constant.STATUS.PENDING;
    return transactionModel.findOne(query).then(result => result);
}

/**
 * 
 * @param {*} transactionId , id of the ongoing transaction
 */
function updateTransaction(transactionId, details) {
    let query = {};
    query["_id"] = transactionId;
    query["paymentStatus"] = constant.STATUS.PENDING;
    let updates = {};
    updates["$set"] = details;
    return transactionModel.findOneAndUpdate(query, updates).then(result => result);
}

module.exports = {
    registerUser,
    getUserData,
    updateData,
    getUser,
    getUserContactNum,
    socialId,
    updateData1,
    updateData2,
    getContactUsPage,
    addContactUs,
    getImage,
    paginate1,

    createTransaction, //initalizing a transaction flow
    fetchTransactionFromId, //fetch transaction details from id

    updateTransaction, // updating the current transaction
}