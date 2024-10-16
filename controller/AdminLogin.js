const userLogin = require("../modules/admin.Schema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const AdminregisterOrLogin = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password",
                success: false,
            });
        }
        console.log("email::::::::",email);
        console.log("password::::::",password);

        // Check if the user exists in the database
        const existingUser = await userLogin.findOne({ email });

        // If the user doesn't exist, register them
        if (!existingUser) {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new userLogin({
                email: email,
                password: hashedPassword,
            });

            await newUser.save();

            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: {
                    id: newUser._id,
                    email: newUser.email,
                    role: newUser.role
                }, // Return relevant user details
            });
        }

        // User exists, validate the password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials. Please check your email or password.",
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: existingUser._id, role: existingUser.role }, process.env.JWT, { expiresIn: '7d' });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user: {
                id: existingUser._id,
                email: existingUser.email,
                role: existingUser.role
            },
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred.",
        });
    }
};

module.exports = { AdminregisterOrLogin };
