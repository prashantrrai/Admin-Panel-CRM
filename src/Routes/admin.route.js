const { Router } = require("express");

// imports
const { registerUserController, getUserController, deleteUserController, editUserController, getUserByIdController } = require("../Controllers/admin.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");

const adminRouter = Router();


adminRouter.post("/admin", registerUserController);
adminRouter.get("/admin", authenticateToken, getUserController);
adminRouter.delete("/admin/:id", authenticateToken, deleteUserController);
adminRouter.put("/admin/:id", authenticateToken, editUserController);
adminRouter.get("/admin/:id", authenticateToken, getUserByIdController );

module.exports = adminRouter;