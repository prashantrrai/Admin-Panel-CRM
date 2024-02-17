const mongoose = require("mongoose");

const db_name = 'admin-panel';

const MONGO_URI = process.env.MONGO_URL || `mongodb://localhost:27017/${db_name}`;



mongoose.connect(MONGO_URI)
.then((response) => {
    console.log("Database Connected");
}).catch((error) => {
    console.error("SOME BUGS IN Connection FILE :", error);
})

