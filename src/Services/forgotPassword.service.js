require("dotenv").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = process.env.SECRET_KEY;
const SERVER_URL = process.env.SERVER_URL;

// imports
const adminModel = require("../Models/admin.model");

const forgotpasswordService = async (email) => {
    try {
        const existinguser = await adminModel.findOne({ email });

        if (!existinguser) {
            throw new Error("Sorry, Email doesn't exists" );
        }

        // generate token for 10 minutes expiry for link
        const token = jwt.sign({ email }, secretKey, { expiresIn: '10m' });

        // now send an Email with password reset link
        const resetLink = `${SERVER_URL}/resetpassword?token=${token}`;
        // sendEmail(existinguser.email, 'Password Reset', `Click this link to reset your password: ${resetLink}`);

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
            throw new Error("New password is required");
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