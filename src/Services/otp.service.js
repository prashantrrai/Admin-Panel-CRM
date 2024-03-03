const fs = require('fs');
const util = require('util');

// imports 
const adminModel = require("../Models/admin.model");
const { generateOTP } = require('../utils/generate_otp');
const { sendMail } = require('./email.service');

// Promisify fs.readFile
const readFile = util.promisify(fs.readFile);

let current_otp;

const otpSentService = async (id) => {
    try {
        const existinguser = await adminModel.findById(id);

        // User exists, proceed with edit
        if (!existinguser) {
            throw new Error('Sorry, user not found');
        }

        // Load HTML template for forgot password email
        const template = await readFile('src/templates/otp-verification.html', 'utf8');

        // compose email content
        const OTP = generateOTP();
        const subject = 'OTP Verification Request';
        const description = template.replace('{{ firstname }}', existinguser.profile.firstName).replace('{{ lastname }}', existinguser.profile.lastName).replace('{{ otp }}', OTP);

        current_otp = OTP;

        return await sendMail(existinguser.email, subject, description);

    } catch (error) {
        console.error('ERROR IN otpSent SERVICE:', error);
        throw error;
    }
}

const otpVerificationService = async (id, otp) => {
    try {
        const existinguser = await adminModel.findById(id);

        // Load HTML template for forgot password email
        const template = await readFile('src/templates/verification-success.html', 'utf8');

        // console.log(current_otp)

        // Check if OTP is correct
        if (otp !== current_otp) {
            throw new Error('Incorrect OTP. Please enter the correct OTP.');
        }

        // update field isVerified with true
        const result = await adminModel.findByIdAndUpdate(id, {
            isVerified: true,
        });

        // compose email content
        const subject = 'Verification Successful';
        const description = template.replace('{{ firstname }}', existinguser.profile.firstName).replace('{{ lastname }}', existinguser.profile.lastName);

        await sendMail(existinguser.email, subject, description);

        return result;

    } catch (error) {
        console.error('ERROR IN otpVerification SERVICE:', error);
        throw error;
    }
}

module.exports = { otpSentService, otpVerificationService };