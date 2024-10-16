// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true, // Ensures no duplicate emails
    },
    phoneNumber: {
        type: String, // Changed to String for consistency
    },
    otp: {
        type: String,
    },
    panCard: {
        type: String,
    },
    bankAccount: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
    },
    newPassword: {
        type: String,
    },
    confirmPassword: {
        type: String,
    },
    rememberMe: {
        type: Boolean,
        default: false,
    },
    // Fields from UpdateProfile schema
    name: {
        type: String,

    },
    dob: {
        type: String,

    },
    profileImage: {
        type: String,
    },
    teamName:{
        type:String,
    },
    FavourateTeam:{
        type:String,
    },
    Gender:{
        type:String,
    },
    Address:{
        type:String,
    }
}, {
    timestamps: true,
});

// Creating the User model
const User = mongoose.model('Customer', userSchema);
module.exports = User;
