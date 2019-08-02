/**
 * @author vishal rana
 */

const MODEL_REF_OBJ = {
    TRSN: "transaction",
    USRSCMA: "userSchema",
    KYBRD: "keyboardSchema"
}

const KEYBOARD_PRICE_ENUM = {
    FREE: "free",
    PAID: "paid"
}

const STATUS = {
    INITIAL: "INITIAL",
    PENDING: "PENDING",
    REJECTED: "REJECTED",
    REFUNDED: "REFUNDED",
    COMPLETED: "COMPLETED"
}

module.exports = {
    MODEL_REF_OBJ,

    KEYBOARD_PRICE_ENUM,

    STATUS
}