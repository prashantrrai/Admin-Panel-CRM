const bcrypt = require('bcrypt');

// Import the admin model
const adminModel = require('../Models/admin.model');

const registerUserService = async (username, profile, email, password, roleId) => {
    try {
        // Validate input fields before proceeding.
        if (!username || !profile || !email || !password || !roleId) {
            throw new Error('Invalid input. Please provide valid data.');
        }

        // Checking if email is already registered.
        const existingAdmin = await adminModel.find({ email, username });
        if (existingAdmin.length > 0) {
            console.log('Check username or email! User is already registered.');
            throw new Error('Check username or email! User is already registered.');
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
        console.error('ERROR IN registerUser SERVICE:', error);
        throw error;
    }
};


const deleteUserService = async (id) => {
    try {

        const user = await adminModel.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // User exists, proceed with deletion
        return await adminModel.findByIdAndDelete(id);
        
    } catch (error) {
        console.error('ERROR IN deleteUser SERVICE:', error);
        throw error;
    }
}


const editUserService = async (id) => {
    try {
        const user = await adminModel.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // User exists, proceed with edit
        return await adminModel.findByIdAndUpdate(id);
        
    } catch (error) {
        console.error('ERROR IN editUser SERVICE:', error);
        throw error;
    }
}


module.exports = { registerUserService, deleteUserService, editUserService };
