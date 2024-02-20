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
            return res.status(401).json({ message: 'Invalid username' });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                return res.status(401).json({ message: 'Invalid password' });
            }
        })

        const token = jwt.sign({ id: user._id, username: user.username, email: user.email, roleId: user.roleId, role: user.roleDetails }, secretKey, { expiresIn: '20m' });

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