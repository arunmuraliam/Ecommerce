import express from "express";
import { verifyAdmin } from "../../seller/utils/verifyToken.js";
import { addDeliveryAddress, confirmOrder, createOrder, onlinePaymentConfirmation } from "../controllers/orders.js";


const router = express.Router();

router.post("/create-order/:userID", createOrder );
router.post("/add-delivery-address/:orderID", addDeliveryAddress );
router.post("/confirm-order/:orderID",  confirmOrder);
router.post("/verify-order/:orderID", onlinePaymentConfirmation );


export default router;     