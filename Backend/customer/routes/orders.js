import express from "express";
import { verifyUser } from "../../customer/utils/verifyToken.js";
import { addDeliveryAddress, createOrder } from "../controllers/orders.js";


const router = express.Router();

router.post("/create-order", verifyUser, createOrder );
router.post("/add-delivery-address/:orderID", verifyUser, addDeliveryAddress );


export default router;