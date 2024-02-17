const { Router } = require('express');

// imports
const { login } = require('../Controllers/auth.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

const authRouter = Router();

authRouter.post('/login', login);
authRouter.get('/protected-route', authenticateToken, (req, res) => {
    // Protected route logic
    res.json({ message: 'Protected route accessed successfully.' });
});

module.exports = router;