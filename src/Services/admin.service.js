// admin.service.js
const bcrypt = require('bcrypt');

//imports
const adminModel = require('../Models/admin.model');


const registerAdmin = async (name, email, password) => {

    // Validate input fields before proceeding.
    if (!name || !email || !password) {
        throw new Error('Invalid input. Please provide valid data.');
    }

    // Checking if email is already registered.
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
        throw new Error('Email is already registered.');
    }

    // Hashing the password before saving it.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the admin in a single step
    return adminModel.create({
        name,
        email,
        password: hashedPassword
    });
};

module.exports = { registerAdmin };
