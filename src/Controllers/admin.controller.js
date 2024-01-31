const adminModel = require("../Models/admin.model");
const adminService =  require("../Services/admin.service");


const registerAdmin = async (req, res) => {
    try {

        const { username, profile, email, password, roleId } = req.body;

        const adminData = await adminService.registerAdmin(username, profile, email, password, roleId);

        res.status(201).json({
            success: true,
            message: "Admin Registered Successfully",
            response: adminData
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAdmin = async (req, res) => {
    try {
        const adminData = await adminModel.find();
        
        res.status(200).json({
            success: true,
            message: "Admin Fetched Successfully",
            response: adminData
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { registerAdmin , getAdmin};