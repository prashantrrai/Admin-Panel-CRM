require("dotenv").config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = process.env.SECRET_KEY;

// imports
const adminModel = require("../Models/admin.model");

const loginService = async (credentials) => {
    try {
        const { username, password } = credentials;
        const user = await adminModel.findOne({ username });

        if (!user) {
            throw new Error('Sorry, Invalid username');
        }

        // Compare the password using bcrypt.compare
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Sorry, Invalid password');
        }

        // Password is correct, generate JWT token
        const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            roleId: user.roleId,
            role: user.roleDetails
        }, secretKey, { expiresIn: '1h' });

        return token;
    } catch (error) {
        console.error('ERROR IN login SERVICE:', error);
        throw error;
    }
}


const signupService = async (userData) => {

    try {
        const token = jwt.sign(userData, secretKey, { expiresIn: '20m' });

        return token;
    } catch (error) {
        console.error('ERROR IN signUp SERVICE:', error);
        throw error;
    }
};


module.exports = { loginService, signupService };