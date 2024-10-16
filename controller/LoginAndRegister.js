const userDetails = require("../modules/userLogin.Schema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator'); // Import otp-generator
require('dotenv').config();

// Register or Login function
const registerOrLogin = async (req, res) => {
    const { email, phoneNumber, otp } = req.body;

    try {
        if (!email && !phoneNumber) {
            return res.status(400).json({
                message: "Please provide at least one detail: email or phone number.",
                success: false,
            });
        }
        // Check for existing user 
        const existingUser = await userDetails.findOne({ email, phoneNumber });

        // If user is not present, register the user and generate OTP
        if (!existingUser) {
            const generatedOtp = otpGenerator.generate(6, { upperCase: false, specialChars: false, digits: true }); // Ensure it's numeric

            const newUser = new userDetails({
                email: email || null,
                phoneNumber: phoneNumber || null,
                otp: generatedOtp
            });

            await newUser.save();

            // Optionally, send the OTP to the user's phone or email here
            return res.status(201).json({
                success: true,
                message: "User registered successfully. OTP has been generated.",
                otp: generatedOtp // Return OTP for testing purposes (remove in production)
            });
        } else {
            // If user exists, verify the OTP
            if (!otp) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide the OTP for verification.",
                });
            }

            // Check if the OTP matches
            if (existingUser.otp !== otp) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid OTP. Please try again.",
                });
            }

            // Generate a token for the user after successful OTP verification
            const token = jwt.sign({ id: existingUser._id }, process.env.JWT, { expiresIn: '7d' });
            return res.status(200).json({
                success: true,
                user: existingUser,
                token,
                message: "User logged in successfully.",
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred.",
        });
    }
};

module.exports = { registerOrLogin };
