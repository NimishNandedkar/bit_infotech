import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";


const UserSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role:{
        type: String,
        default: "user",
        enum: ["user", "admin"]
    
    }
}, 
{timestamps:true});

// Hash password before saving to database
UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next(); // If password is not modified, skip this middleware
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next(); // Call the next middleware
});

// Verify password
UserSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// Generate JWT token
UserSchema.methods.generateJWTToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRY
    })
};


export const User = mongoose.model("User", UserSchema);