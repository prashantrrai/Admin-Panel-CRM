// imports
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

// maintain a SET in js which contains only unique values unlike Array.
const revokedTokens = new Set();

// Function to check if a token is revoked
const isTokenRevoked = (token) => {
    return revokedTokens.has(token);
};

// Middleware to verify JWT token
const verifyTokenMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authorization token is required.' });
        }

        if ( isTokenRevoked(token) ) {
            return res.status(401).json({ message: 'unauthorized, reset link expired' });
        }
    
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.user = decoded;
            next();
        });


    } catch (error) {
        console.error("HEADER ERROR :", error);
        return res.status(401).json({ message: 'Authorization header missing or invalid.' });
    }
};

module.exports = { revokedTokens, isTokenRevoked, verifyTokenMiddleware };