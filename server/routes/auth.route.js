import express from "express";
import signup from "../controllers/signUp.controller.js";
import logout from "../controllers/logout.controller.js";
import login from "../controllers/login.controller.js";
import verifyEmail from "../controllers/verifyEmail.controller.js";

const router = express.Router();

router.post("/signup", signup)

router.post("/verify-email", verifyEmail)

router.get("/login", login)

router.get("/logout", logout)

export default router;