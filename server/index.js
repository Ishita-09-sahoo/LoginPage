import express from "express";
import dotenv from "dotenv";
import connectDB from './db/connectDB.js';
import  authRoutes from './routes/auth.route.js';
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json()); //allows us to parse incoming requests in JSON from req.body
app.use(cookieParser()); //allows us to parse incoming cookies

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port:", PORT);
})

