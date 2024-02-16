const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        lowercase: true,
        trim: true,
        unique: true,
    },
    profile: {
        firstName: {
            type: String,
            required: [true, 'First name is required']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required']
        },
        avatarURL: {
            type: String,
            default: 'https://png.pngtree.com/png-vector/20190629/ourmid/pngtree-office-work-user-icon-avatar-png-image_1527655.jpg'
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
    },
    roleId: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5],
    },
    roleDetails: {},
    isVerified: {
        type: Boolean,
        default: 0
    },
    two_factor_enabled: {
        type: Boolean,
        default: 0
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    password_last_changed: {
        type: Date,
        default: Date.now,
    }
    
},
    {
        timestamps: true
    }

);


// Pre-save hook to set roleDetails based on roleId
adminSchema.pre('save', function(next) {
    const roleIdDetailsMap = {
        1: "SuperAdmin",
        2: "Admin",
        3: "HR",
        4: "Employee",
        5: "Customer"
    };

    this.roleDetails = roleIdDetailsMap[this.roleId];
    next();
});

// Customize response object to include roleDetails inside roleId
adminSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.roleId = {
            id: ret.roleId,
            role: doc.roleDetails
        };
        delete ret.roleDetails;
        return ret;
    }
});


const adminModel = mongoose.model('admin', adminSchema);

module.exports = adminModel;