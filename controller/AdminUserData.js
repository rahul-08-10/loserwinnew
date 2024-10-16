const userData = require('../modules/userLogin.Schema');

const user = async (req, res) => {
    try {
        const { name, email, phoneNumber, profileImage, teamName, FavourateTeam, Gender, Address } = req.body;
        if (!name || !email || !phoneNumber || !profileImage || !teamName || !FavourateTeam || !Gender || !Address) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the details"
            });
        }

        const existingUser = await userData.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User is already registered with this email'
            });
        }
        const newUser = new userData({
            name,
            email,
            phoneNumber,
            profileImage,
            teamName,
            FavourateTeam,
            Gender,
            Address
        });

        // Save the new user
        await newUser.save();

        return res.status(201).json({
            success: true,
            data: newUser,
            message: "User registered successfully"
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during registration"
        });
    }
};

// Get User Data by Admin
const getUserAdmin = async (req, res) => {
    try {
        const getUser = await userData.findOne(); // Adjust to your query criteria if needed (e.g., findById)

        if (!getUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: getUser,
            message: "User data retrieved successfully"
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the user data"
        });
    }
};

module.exports = { user, getUserAdmin };
