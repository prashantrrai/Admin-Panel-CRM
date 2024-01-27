const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: [true, 'First name is required']
        },
        last: {
            type: String,
            required: [true, 'Last name is required']
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters']
    }
    
},
    {
        timestamps: true
    }

);

const adminModel = mongoose.model('admin', adminSchema);

module.exports = adminModel;