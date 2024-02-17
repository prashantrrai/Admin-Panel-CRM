const jwt = require('jsonwebtoken');
const adminModel = require('../Models/admin.model');
const secretKey = 'neog-hub-key';
const bcrypt = require('bcrypt');

const signup = (userData) => {
    // Generate JWT token with a 20-minute expiry
    const token = jwt.sign(userData, secretKey, { expiresIn: '20m' });
    return token;
};


const login = async (req, res) => {

    try {
        const { username, password } = req.body;

        const user = await adminModel.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        // Compare password with bcrypt hash
        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // If authentication succeeds, generate JWT token
            const token = jwt.sign({ id: user._id, username: user.username, email: user.email, roleId: user.roleId, role: user.roleDetails }, secretKey, { expiresIn: '20m' });

            res.status(200).json({
                success: true,
                message: "Login Successfully",
                token: token
            })

        });
    } catch (error) {
        console.error("ERROR IN login CONTROLLER:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
            error: 'Internal Server Error'
        })
    }
};

module.exports = { login, signup }