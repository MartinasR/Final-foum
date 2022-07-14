const nodemailer = require('nodemailer');

module.exports = async (subject, email, message = '') => {
    console.log(process.env.GMAIL, process.env.GMAIL_PASS)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASS
        }
    });

    const mailOptions = {
        from: 'tommyeaser@gmail.com',
        to: email,
        subject: subject,
        text: message,
        html: null
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });

    return true;
};