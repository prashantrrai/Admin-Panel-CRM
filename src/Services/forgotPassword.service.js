require("dotenv").config();

// imports modules 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const util = require('util');

// imports
const adminModel = require("../Models/admin.model");
const { sendMail } = require("./email.service");

const secretKey = process.env.SECRET_KEY;
const SERVER_URL = process.env.SERVER_URL;

// Promisify fs.readFile
const readFile = util.promisify(fs.readFile);

const forgotpasswordService = async (email) => {
    try {
        const existinguser = await adminModel.findOne({ email });

        if (!existinguser) {
            throw new Error("Sorry, Email doesn't exists");
        }

        // generate token for 10 minutes expiry for link
        const token = jwt.sign({ email }, secretKey, { expiresIn: '1m' });

        // Load HTML template for forgot password email
        const template = await readFile('src/templates/forgot-password.html', 'utf8');

        // compose email content
        const resetLink = `https://${SERVER_URL}/resetpassword?token=${token}`;
        const subject = 'Forgot Password Request';
        const description = template.replace('{{ username }}', existinguser.username).replace('{{ resetLink }}', resetLink);

        await sendMail(existinguser.email, subject, description);

        return token;

    } catch (error) {
        console.error('ERROR IN forgotpassword SERVICE:', error);
        throw error;
    }
}

const resetPasswordService = async (token, newPassword) => {
    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, secretKey);

        const email = decoded.email;

        // Validate the new password
        if (!newPassword) {
            throw new Error("new-password is required");
        }

        // Hashing the password before saving it.
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        return await adminModel.findOneAndUpdate({ email }, { password: hashedPassword });
    } catch (error) {
        console.error('ERROR IN resetpassword SERVICE:', error);
        throw error;
    }
}


module.exports = { forgotpasswordService, resetPasswordService };