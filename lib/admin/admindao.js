
let mongoose = require("mongoose")
var emoji_schema = require('../schema/emojiapp')
var keyBoardSchema = require('../schema/keyboard')
var cms_Schema = require('../schema/cmspages')
var category_schema = require("../schema/category")


function paginate(req) {
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
    options.select = '_id userName fullName emailId contactNumber status loginType image'
    return emoji_schema.paginate(query, options);
}
function checkUser(id) {
    let query = {
        _id: id
    }
    return emoji_schema.findOne(query, '_id userName fullName emailId contactNumber status loginType image');
}
function updateUserData(id, obj) {
    let query = {
        _id: id
    }
    let update = {}
    update['$set'] = obj;

    let option = {}
    option.new = true
    return emoji_schema.findOneAndUpdate(query, update, option);

}
function getUsers(obj) {
    return emoji_schema.find(obj);
}



function getCMS(obj) {
    return cms_Schema.findOne(obj, 'description');
}
function addCMS(obj) {
    let cms = new cms_Schema(obj);
    return cms.save(cms)
}
function editCMS(id, obj) {
    let query = {
        _id: id
    }
    let update = {}
    update['$set'] = obj;

    let option = {}
    option.new = true
    return cms_Schema.findOneAndUpdate(query, update, option);
}




function addKeyboard(obj) {
    let keyBoard = new keyBoardSchema(obj);
    return keyBoard.save(keyBoard)
}
function getKeyboard(req) {
    let query = {
        keyboardName: req.body.keyboardName,
        categoryName: req.body.categoryName
    }
    return keyBoardSchema.findOne(query);
}
function checKkeyboard(id) {
    let query = {
        _id: id
    }
    return keyBoardSchema.findOne(query);
}
function updateKeyboard(id, obj) {
    let query = {
        _id: id
    }
    let update = {}
    update['$set'] = obj;

    let option = {}
    option.new = true
    return keyBoardSchema.findOneAndUpdate(query, update, option);

}




function addCategory(obj) {
    let category = new category_schema(obj)
    return category.save(category)
}

function getCategory(query) {

    return category_schema.findOne(query)
}

function activeCategory(query) {

    return category_schema.find(query)
}

function updateCategoryData(id, obj) {
    let query = {
        _id: id
    }
    let update = {}
    update['$set'] = obj;

    let option = {}
    option.new = true


    return category_schema.findOneAndUpdate(query, update, option);

}
function setCategoryActivity(id, obj) {
    let query = {
        categoryName: id
    }

    let update = {}
    update['$set'] = obj;

    let multi = {}
    multi.new = true

    return keyBoardSchema.update(query, update, multi);

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
    options.select = '_id status categoryName createdBy'
    return category_schema.paginate(query, options);
}

module.exports = {
    updateUserData,
    checkUser,
    paginate,
    paginate1,
    getUsers,
    getCMS,
    addCMS,
    editCMS,
    addKeyboard,
    getKeyboard,
    checKkeyboard,
    updateKeyboard,
    addCategory,
    getCategory,
    activeCategory,
    updateCategoryData,
    setCategoryActivity

}