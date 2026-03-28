import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return res.status(401).json({success: false, message: "Invalid token"});
    }
    req.userId = decoded.userID;
    next();
    
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Invalid token" });    
  }
}

export default verifyToken;