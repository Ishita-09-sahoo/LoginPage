import User from "../models/user.model.js";

const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error checking auth:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export default checkAuth;
