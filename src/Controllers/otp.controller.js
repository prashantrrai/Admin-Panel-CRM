const { otpSentService, otpVerificationService } = require("../Services/otp.service");

const otpSentController = async (req, res) => {
    try {
        const { id } = req.params;
        
        await otpSentService(id);

        res.status(200).json({
            success: true,
            message: "otp verification email sent",
        })
    } catch (error) {
        console.error("ERROR IN otpVerification CONTROLLER:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const otpVerificationController = async (req, res) => {
    try {
        const { id } = req.params;
        const otp = req.body.otp
        
        await otpVerificationService(id, otp);

        res.status(200).json({
            success: true,
            message: "otp verification success",
        })
    } catch (error) {
        console.error("ERROR IN otpVerification CONTROLLER:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = { otpSentController, otpVerificationController };