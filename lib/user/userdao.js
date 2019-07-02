let mongoose = require("mongoose")
var emoji_schema = require('../schema/emojiapp')
var keyBoardSchema = require('../schema/keyboard')
var cms_Schema = require('../schema/cmspages')
var category_schema = require("../schema/category")
var contactUsSchema = require("../schema/contactUs")

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
    getImage
}