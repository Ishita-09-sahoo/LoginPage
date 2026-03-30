import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken&SetCookie.js";

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user)
        {
            res.status(400).json({success: false, message: "User does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
        {
            res.status(400).json({success: false, message: "Invalid credentials"});
        }
        generateTokenAndSetCookie(res, user._id);
        await user.save();
        res.status(200).json({success: true, message: "Logged in successfully", user: {
            ...user._doc,
            password: undefined,
        }});
    } catch (error) {
        console.log("Error logging in:", error.message); 
        res.status(400).json({success: false, message: error.message});
    }

}

export default login;