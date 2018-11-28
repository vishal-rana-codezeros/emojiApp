const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,  //true for 465 port, false for other ports
    auth:
    {
        user: 'codezerostrainee@gmail.com',
        pass: 'codezeros123'
    }
});
function sendMail(subject, text, html, to) {
    const mailOptions =
    {
        
        from: process.env.sender_email_id,
        to: to, // list  of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html
        
    };

    return mailOptions;
}

function welcome_mail(email,obj)
{
    return sending_logic(email,obj,constants.TEMPLATE)
}