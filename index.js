const express = require("express");
const cors = require('cors');

require("dotenv").config();
require("./src/DB/connection");


// imports routes
const adminRouter = require("./src/Routes/admin.route");
const authRouter = require("./src/Routes/auth.route");
const homeRoutes = require("./src/Routes/home");
const forgotPasswordRouter = require("./src/Routes/forgotPassword.route");


// configurations
const app = express();
const PORT = process.env.PORT || 8080;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api/v1", homeRoutes);
app.use("/api/v1", adminRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", forgotPasswordRouter)

// server listening
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api/v1`);
})

