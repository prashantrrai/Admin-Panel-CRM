const { Router } = require('express');

// imports
const { forgotpassword, getforgotpasswordlink, resetPassword } = require('../Controllers/forgotPassword.controller');

const forgotPasswordRouter = Router();

forgotPasswordRouter.post("/forgotpassword", forgotpassword);
// forgotPasswordRouter.get("/resetpassword/:token", getforgotpasswordlink);
forgotPasswordRouter.post("/resetpassword/:token", resetPassword);


module.exports = forgotPasswordRouter;