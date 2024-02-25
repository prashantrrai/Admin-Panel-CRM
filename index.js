const express = require("express");
const cors = require('cors');

require("dotenv").config();
require("./src/DB/connection");


// imports routes
const adminRouter = require("./src/Routes/admin.route");
const authRouter = require("./src/Routes/auth.route");
const homeRoutes = require("./src/Routes/home");
const forgotPasswordRouter = require("./src/Routes/forgotPassword.route");
const otpRouter = require("./src/Routes/otp.route");


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
app.use("/api/v1", otpRouter)

// server listening
app.listen(PORT, () => {
    console.log(`Development Server is running on http://localhost:${PORT}/api/v1`);
    console.log(`Production Server is running on https://${process.env.SERVER_URL}`);
})

