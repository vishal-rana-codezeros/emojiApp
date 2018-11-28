
const nodeMailer = require('nodemailer')
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
        host: 'smtp.gmail.com',
        port: 465,
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

function sendMessage(body,recipient) {
    //return new Promise((resolve,reject)=>{
        client.messages.create                                     //sending SMS start  ------
        ({
            body: body,
            from: process.env.tiwillio_FirstNumber,
            to: recipient,//process.env.receiver_MobileNumber             // to: '+918200268488'   
        })
        .then(message=>console.log(message.sid)).catch((err)=>{
            if(err){
                console.log(error)
            }
        })
    //})
    
    // .done();

}
module.exports = {
    sendMail,
    sendMessage
}