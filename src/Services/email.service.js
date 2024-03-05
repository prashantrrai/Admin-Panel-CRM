require('dotenv').config();
const nodemailer = require('nodemailer');


// 1. Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
});


// 3. send email function
async function sendMail(email, subject, description) {
    try {
        // 2. configure email content
        const mailOptions = {
            from: process.env.GMAIL,
            to: email,
            subject: subject,
            html: description,
        }

        const result = await transporter.sendMail(mailOptions);
        console.log("Mail sent ID: %s", result.messageId);
        return result;
    } catch (error) {
        console.error("SEND MAIL FAILED : ", error)
    }
}

module.exports = { sendMail };