import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateVerificationCode from "../utils/generateVerificationCode.js";
import generateTokenAndSetCookie from "../utils/generateToken&SetCookie.js";
import sendVerificationEmail from "../mail/sendVerificationEmail.js";

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

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

    await sendVerificationEmail(newUser.email, verificationToken);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      newUser: {
        ...newUser._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message, success: false });
  }
};

export default signup;
