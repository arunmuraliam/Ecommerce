import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser"

import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js"
import categoryRoute from "./routes/category.js"
import orderRoute from "./routes/orders.js"

const app = express();
dotenv.config();

const connect = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB database admin-panel");
    } catch (error) {
        throw error
    }
};

//middleware

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());


app.use("/api/admin/auth", authRoute);
app.use("/api/admin", productRoute);
app.use("/api/admin", categoryRoute);
app.use("/api/admin", orderRoute);

app.listen(8002, () => {
    connect();
    console.log("Connected to backend admin-panel \nServer listening on port 8002");
})