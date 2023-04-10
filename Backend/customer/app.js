import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.js";
import cartRoute from "./routes/cart.js";
import paymentRoute from "./routes/payment.js";
import customerRoute from "./routes/customer.js";
import orderRoute from "./routes/orders.js";

const app = express();
dotenv.config();

const connect = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB database Customer");
    } catch (error) {
        throw error
    }
};

//middleware

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());


app.use("/api/auth", authRoute);
app.use("/api", cartRoute);
app.use("/api/payment", paymentRoute);
app.use("/api", customerRoute);
app.use("/api", orderRoute);

app.listen(8000, () => {
    connect();
    console.log("Connected to backend customer \nServer listening on port 8000");
})