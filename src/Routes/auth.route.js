const { Router } = require('express');

// imports
const { login } = require('../Controllers/auth.controller');

const authRouter = Router();

authRouter.post('/login', login);


module.exports = authRouter;