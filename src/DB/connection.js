const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017';



mongoose.connect(MONGO_URI)
.then((response) => {
    console.log("MongoDB Connected Successfully");
}).catch((error) => {
    console.log("SOME BUGS IN Connection FILE :",error);
})

