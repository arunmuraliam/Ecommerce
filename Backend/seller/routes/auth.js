import express from "express";
import { logout, sellerLogin, sellerSignup } from "../controllers/auth.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/seller-signup", sellerSignup);
router.post("/seller-login", sellerLogin);
// router.get("/seller-data/:id", verifyUser, (req,res) => {
//     res.send("Hai User")
// })

router.put("/logout", logout);


export default router;