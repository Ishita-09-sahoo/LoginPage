import express from "express";
import signup from "../controllers/signUp.controller.js";
import logout from "../controllers/logout.controller.js";
import login from "../controllers/login.controller.js";
import verifyEmail from "../controllers/verifyEmail.controller.js";
import forgotPassword from "../controllers/forgotPassword.controller.js";
import resetPassword from "../controllers/resetPassword.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import checkAuth from "../controllers/checkAuth.controller.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);

router.post("/verify-email", verifyEmail);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.post("reset-password/:token", resetPassword);

router.post("/logout", logout);

export default router;
