const { Router } = require("express");

// imports
const { registerUserController, getUserController, deleteUserController, editUserController } = require("../Controllers/admin.controller");

const adminRouter = Router();


adminRouter.post("/admin", registerUserController);
adminRouter.get("/admin", getUserController);
adminRouter.delete("/admin/:id", deleteUserController);
adminRouter.put("/admin/:id", editUserController);

module.exports = adminRouter;