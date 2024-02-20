
// imports
const adminModel = require("../Models/admin.model");
const { registerUserService, deleteUserService, editUserService } = require("../Services/admin.service");
const { signupService } = require("../Services/auth.service");


const registerUserController = async (req, res) => {
    try {

        const data = req.body;
        
        const token = await signupService(data);

        const userData = await registerUserService(data);

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            response: userData,
            token: token
        })
    } catch (error) {
        console.error("ERROR IN registerUser CONTROLLER:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
            error: 'Internal Server Error'
        })
    }
}

const getUserController = async (req, res) => {
    try {
        const userData = await adminModel.find();

        res.status(200).json({
            success: true,
            message: "User Fetched Successfully",
            response: userData
        })
    } catch (error) {
        console.error("ERROR IN getUser CONTROLLER:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params;

        await deleteUserService(id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    } catch (error) {
        console.error("ERROR IN deleteUser CONTROLLER:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
            error: 'Internal Server Error'
        })
    }
}

const editUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;

        const updatedUser = await editUserService(id, userData);

        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
            response: updatedUser
        })
    } catch (error) {
        console.error("ERROR IN editUser CONTROLLER:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
            error: 'Internal Server Error'
        })
    }
}

const getUserByIdController = async (req, res) => {
    try {
        const { Id } = req.params;
        console.log(Id)
        const userData = await adminModel.findById(Id);

        res.status(200).json({
            success: true,
            message: "User Fetched Successfully",
            response: userData
        })
    } catch (error) {
        console.error("ERROR IN getUserById CONTROLLER:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { registerUserController, getUserController, deleteUserController, editUserController, getUserByIdController };