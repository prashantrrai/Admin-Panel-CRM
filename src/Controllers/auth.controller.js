// imports
const { loginService } = require("../Services/auth.service");


const login = async (req, res) => {
    try {
        const credentials = req.body;
        const token = await loginService(credentials);
        
        res.status(200).json({
            success: true,
            message: "Login Successfully",
            token: token
        })
    } catch (error) {
        console.error("ERROR IN login CONTROLLER:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
            error: 'Internal Server Error'
        })
    }
};


module.exports = { login };