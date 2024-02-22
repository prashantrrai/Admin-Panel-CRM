require("dotenv").config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

exports.authenticateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authorization token is required.' });
        }

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.error("TOKEN ERROR :", err)
                return res.status(403).json({ message: 'Invalid or expired token.' });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error("HEADER ERROR :", error);
        return res.status(401).json({ message: 'Authorization header missing or invalid.' });
    }
};

