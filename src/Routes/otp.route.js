const { Router } = require('express');

// imports
const { otpSentController, otpVerificationController } = require('../Controllers/otp.controller');

const otpRouter = Router();

otpRouter.post("/otp/:id", otpSentController);

otpRouter.post("/otp-verification/:id", otpVerificationController);


module.exports = otpRouter;