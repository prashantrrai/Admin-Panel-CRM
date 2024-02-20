const { Router } = require("express");

// imports
const { registerUserController, getUserController, deleteUserController, editUserController, getUserByIdController } = require("../Controllers/admin.controller");

const adminRouter = Router();


adminRouter.post("/admin", registerUserController);
adminRouter.get("/admin", getUserController);
adminRouter.delete("/admin/:id", deleteUserController);
adminRouter.put("/admin/:id", editUserController);
adminRouter.get("/admin/:id", getUserByIdController );

module.exports = adminRouter;