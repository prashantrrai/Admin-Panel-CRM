const { Router } = require("express");

// imports
const { registerAdmin, getAdmin } = require("../Controllers/admin.controller");

const adminRouter = Router();


adminRouter.post("/admin", registerAdmin);
adminRouter.get("/admin", getAdmin);

module.exports = adminRouter;