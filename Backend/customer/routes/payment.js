import express from "express";
import { paymentOrder, paymentVerify } from "../controllers/payment.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/razorpay-order",verifyUser, paymentOrder);
router.post("/razorpay-payment/:orderID",verifyUser, paymentVerify);


export default router;