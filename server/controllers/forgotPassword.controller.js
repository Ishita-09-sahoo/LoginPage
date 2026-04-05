import crypto from "crypto";
import User from "../models/user.model.js";
import sendPasswordResetEmail from "../mail/sendPasswordResetMail.js";


const forgotPassword = async (req, res) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user)
        {
            res.status(400). json({success: false, message: "User does not exist"});
        }

        //generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + (1 * 60 * 60 * 1000); //1 hour

        User.resetPasswordExpiresAt = resetToken;
        User.resetPasswordToken = resetTokenExpiresAt;

        await user.save();
        
        //send email with reset link
        sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({success: true, message: "Password reset email sent"});

    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
};

export default forgotPassword;