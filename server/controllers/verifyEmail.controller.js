import sendWelcomeEmail from "../mail/sendWelcomeemail.js";
import User from "../models/user.model.js";

const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const newUser = await User.findOne({
      verificationToken: code, //correct code
      verificationExpiresAt: { $gt: Date.now() }, //code is not expired and is still valid
    });

    if (!newUser) {
      res
        .status(400)
        .send({ success: false, message: "Invalid verification code" });
    }

    newUser.isVerified = true;
    newUser.verificationToken = undefined;
    newUser.verificationExpiresAt = undefined;

    await newUser.save();

    await sendWelcomeEmail(newUser.email, newUser.name);

    res.status(200).json({
        success: true,
        message: "Email verified successfully",
    })
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};  

export default verifyEmail;
