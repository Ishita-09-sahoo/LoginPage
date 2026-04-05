
const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({success: true, message: "Logged out successfully"})
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}

export default logout;