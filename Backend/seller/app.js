import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js"

const app = express();
dotenv.config();

const connect = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB database Seller");
    } catch (error) {
        throw error
    }
};

//middleware

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());


app.use("/api/seller/auth", authRoute);
app.use("/api/seller", productRoute);

export default app;
app.listen(8001, () => {
    connect();
    console.log("Connected to backend seller \nServer listening on port 8001");
})