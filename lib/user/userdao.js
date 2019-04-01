let mongoose = require("mongoose")
var emoji_schema = require('../schema/emojiapp')
var keyBoardSchema = require('../schema/keyboard')
var cms_Schema = require('../schema/cmspages')
var category_schema = require("../schema/category")

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
async function getUser(id) {
    let query = {
        emailId: id
    }

    let result_output = await emoji_schema.findOne(query).exec();
    // console.log("into user dao",result_output);
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
module.exports = {
    registerUser,
    getUserData,
    updateData,
    getUser,
    socialId,
    updateData1
}