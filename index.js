const express = require("express");
const cors = require('cors');

require("dotenv").config();
require("./src/DB/connection");


// imports routes
const homeRoutes = require("./src/Routes/index");
const adminRouter = require("./src/Routes/admin.route");


const app = express();
const PORT = process.env.PORT || 8080;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(homeRoutes);
app.use("/api/v1" ,adminRouter);

// server listening
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

