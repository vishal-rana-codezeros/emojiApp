/**
 * @author vishal rana
 */

const braintree = require("braintree");

const gateway = braintree.connect({
    environment: process.env.brainTreeEnv || braintree.Environment.Sandbox,
    merchantId: process.env.brainTreeMerchant,
    publicKey: process.env.brainTreePublic,
    privateKey: process.env.brainTreePrivate
});


/**
 * generating a client token to intiate the process of buying the keyboard
 */
function getTokenForClient() {
    return new Promise((resolve, reject) => {
        gateway.clientToken.generate({
        }, function (err, response) {
            if (err) {
                console.log("there is err", err)
                reject(err);
            } else {
                let clientToken = response.clientToken
                console.log({ clientToken })
                resolve(clientToken)
            }
        });
    })
}

/**
 * 
 * @param {*} nonce, nonce from the client for completing the transaction.
 * @param {*} price , //the price for which we have to initiate the transaction.
 */
function validateNonceAndInitiatePayment(nonce, price) {
    return new Promise((resolve, reject) => {
        gateway.transaction.sale({
            amount: price,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        }, function (err, result) {
            if (err) {
                console.log("there is error while transaction>>>>>>>>>>>>>>", { err })
                reject(err);
            } else {
                resolve(result);
            }
        });
    })

}



module.exports = {
    getTokenForClient, //this function will create a token for client that they can use to initiate the transaction

    validateNonceAndInitiatePayment, //this function will validate the nonce and check if the transaction is sucess or not
}