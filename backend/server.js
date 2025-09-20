import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js"
import gigRouter from "./routes/gigRouter.js"
import reviewRouter from "./routes/reviewRouter.js"
import orderRouter from "./routes/orderRouter.js"
import messageRouter from "./routes/messageRouter.js"
import conversationRouter from "./routes/conversationRouter.js"
import authRouter from "./routes/authRouter.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"

dotenv.config();

const app = express();

mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URI ,{
    dbName: "Fiverr_Project",
}).then(()=>{
    console.log("✅ Connected to MongoDB Atlas");
}).catch((err)=>{
    console.log("❌ MongoDB connection failed:", err);
})

const _dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/orders", orderRouter);
app.use("/api/messages", messageRouter);
app.use("/api/conversations", conversationRouter);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("/*splat", (_,res)=>{
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
})

app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

const PORT = process.env.PORT || 2190;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


