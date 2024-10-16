const update = require('../modules/userLogin.Schema'); 

const updateCandidateData = async (req, res) => {
    const userId = req.body._id;
    const { name, Email, phoneNumber, DOB } = req.body;
    const profileImage = req.file ? req.file.filename : null; // Get the filename of the uploaded image

    // Log the extracted values
    console.log("User ID:", userId);
    console.log("Name:", name);
    console.log("Email:", Email);
    console.log("Phone Number:", phoneNumber);
    console.log("Date of Birth:", DOB);
    console.log("Profile Image Filename:", profileImage); // Log the profile image filename

    try {
        const updatedUser = await update.findByIdAndUpdate(
            userId, 
            {
                $set: {
                    ...(name && { name }),
                    ...(Email && { Email }),
                    ...(phoneNumber && { phoneNumber }),
                    ...(DOB && { DOB }),
                    ...(profileImage && { profileImage }), // Save the profile image filename
                }
            }, 
        );

        console.log("Updated User Document:", updatedUser);

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: updatedUser,
            message: "User updated successfully",
        });

    } catch (error) {
        console.error("Error in updating user:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating the user",
        });
    }
};

module.exports = updateCandidateData;
