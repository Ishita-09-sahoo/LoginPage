import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateVerificationCode from "../utils/generateVerificationCode.js";
import generateTokenAndSetCookie from "../utils/generateToken&SetCookie.js";

const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required")
        }

        const userExists = await User.findOne({email});
        if (userExists) {
            throw new Error("User already exists")
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = generateVerificationCode();

        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24hrs
        });

        await newUser.save();

        //jwt
        generateTokenAndSetCookie(res, newUser._id);

        res.status(200).json({
            success: true,
            message: "User created successfully",
            newUser: {
                ...newUser._doc,
                password: undefined,
            }
        })


    } catch (error) {
        res.status(400).json({error: error.message, success: false});
    }
}

const login = async (req, res) => {
    res.send("login");
}

const logout = async (req, res) => {
    res.send("logout");
}

export { signup, login, logout };