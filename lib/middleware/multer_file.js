var fs = require('fs')
var path = require('path')
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './img');
    },
    filename: function (req, file, callback) {
        let file_name = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        req.newFile_name.push(file_name);
        callback(null, file_name);
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        checkFileType(file, callback)
    }
}).array('img', 5);




function checkFileType(file, callback) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
    if (extName) {
        return callback(null, true);
    }
    else {
        callback('Error:Images only!')
    }
}


module.exports = {

    upload
}