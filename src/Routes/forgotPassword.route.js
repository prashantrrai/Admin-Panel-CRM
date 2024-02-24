const { Router } = require('express');

// imports
const { forgotpassword, resetPassword } = require('../Controllers/forgotPassword.controller');
const { verifyTokenMiddleware } = require('../middlewares/revoke-token.middleware');

const forgotPasswordRouter = Router();

forgotPasswordRouter.post("/forgotpassword", forgotpassword);

forgotPasswordRouter.post("/resetpassword/:token", verifyTokenMiddleware, resetPassword);


module.exports = forgotPasswordRouter;