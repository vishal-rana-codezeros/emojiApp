
const nodeMailer = require('nodemailer')
const userConstants = require('../user/userConstants')
const client = require('twilio')(process.env.accountSid, process.env.authToken);

function sendMail(to, subject, html) {

    const mailOptions =
    {
        from: process.env.sender_Email_Id,
        to: to,
        subject: subject,
        html: html,
    };
    const transporter = nodeMailer.createTransport({
        pool: true,
        // host: userConstants.HOSTMAILDETAILS.host,
        // port: userConstants.HOSTMAILDETAILS.port,
        host: process.env.host,
        port: process.env.port,
        secure: true,
        auth:
        {
            user: process.env.sender_Email_Id,
            pass: process.env.sender_Pasword
        }
    });
    return new Promise((resolve, reject) => {
        return transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(true);
            }
        });
    })
}

function sendMessage(body, recipient) {

    client.messages.create
        ({
            body: body,
            from: process.env.tiwillio_FirstNumber,
            to: recipient,
        })
        .then(message => console.log(message.sid)).catch((err) => {
            if (err) {
                console.log(error)
            }
        })
}
module.exports = {
    sendMail,
    sendMessage
}