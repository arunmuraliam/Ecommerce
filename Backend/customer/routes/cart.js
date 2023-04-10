import express from "express";
import { addToCart, deleteCartItem, getCartItems, getCartTotal, updateQuantity } from "../controllers/cart.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/add-to-cart/:productID/:sellerID",verifyUser, addToCart); //send quantity with this url as qty   eg: ?qty=2
router.delete("/delete-cart-item/:productID",verifyUser, deleteCartItem);
router.patch("/update-quantity/:productID", verifyUser, updateQuantity);
router.get("/get-cart-items",verifyUser, getCartItems);
router.get("/get-cart-total",verifyUser, getCartTotal)

export default router;