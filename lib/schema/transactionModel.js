/**
 * @author vishal rana
 */
const mongoose = require('mongoose');
const constant = require("../constant");
let transactionSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constant.MODEL_REF_OBJ.USRSCMA,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    discount: {
        type: String
    },
    keyBoardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constant.MODEL_REF_OBJ.KYBRD,
        required: true
    },
    keyBoardType: {
        type: String,
        enum: [constant.KEYBOARD_PRICE_ENUM.FREE, constant.KEYBOARD_PRICE_ENUM.PAID],
        required: true
    },
    transactionNonce: {
        type: String
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: [
            constant.STATUS.PENDING,
            constant.STATUS.REFUNDED,
            constant.STATUS.REJECTED,
            constant.STATUS.COMPLETED
        ],
        default: constant.STATUS.PENDING
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastModifiedDate: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model(constant.MODEL_REF_OBJ.TRSN, transactionSchema);