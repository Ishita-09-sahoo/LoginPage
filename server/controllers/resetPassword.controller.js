const resetPassword = async(req, res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: {$gt: Date.now()},
        });

        if (!user)
        {
            res.status(400).json({success: false, message: "Invalid or expired token"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();
        await 
        res.status(200).json({success: true, message: "Password reset successfully" })
    } catch (error) {
        console.log("Error:", error.message);
        res.status(400).json({success: false, message: error.message});
    }
};

export default resetPassword;