require("dotenv").config();
const SERVER_URL = process.env.SERVER_URL;


// imports
const { forgotpasswordService, resetPasswordService } = require("../Services/forgotPassword.service");
const { revokedTokens } = require("../middlewares/revoke-token.middleware");

const forgotpassword = async (req, res) => {
    try {
        const { email } = req.body;

        const token = await forgotpasswordService(email);

        // Construct the reset link with the token
        const resetLink = `https://${SERVER_URL}/resetpassword/${token}`;

        res.status(200).json({
            success: true,
            message: "Password reset email sent",
            resetLink: resetLink,
            token: token
        })

    } catch (error) {
        console.error("ERROR IN ForgotPassword CONTROLLER :", error);
        return res.status(500).json({
            success: false,
            message: error.message,
            error: "Internal Server Error"
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        // Implement logic to reset password using the token
        await resetPasswordService(token, newPassword);

        // Add the token to the list of revoked tokens or black-list
        revokedTokens.add(token);

        res.status(200).json({
            success: true,
            message: "Password reset successfully",
        })

    } catch (error) {
        console.error("ERROR IN resetpassword CONTROLLER :", error);
        return res.status(500).json({
            success: false,
            message: error.message,
            error: "Internal Server Error"
        })
    }
}

module.exports = { forgotpassword, resetPassword };
