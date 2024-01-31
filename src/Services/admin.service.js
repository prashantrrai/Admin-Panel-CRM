const bcrypt = require('bcrypt');

// Import the admin model
const adminModel = require('../Models/admin.model');

const registerAdmin = async (username, profile, email, password, roleId) => {
    try {
        // Validate input fields before proceeding.
        if (!username || !profile || !email || !password || !roleId) {
            throw new Error('Invalid input. Please provide valid data.');
        }

        // Checking if email is already registered.
        const existingAdmin = await adminModel.find({ email, username });
        if (existingAdmin.length > 0) {
            console.log('Check username or email! Admin is already registered.');
            throw new Error('Check username or email! Admin is already registered.');
        }

        // Hashing the password before saving it.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the admin in a single step
        return adminModel.create({
            username,
            profile,
            email,
            password: hashedPassword,
            roleId,
        });
    } catch (error) {
        console.error('Error in registerAdmin:', error);
        throw error;
    }
};

module.exports = { registerAdmin };
