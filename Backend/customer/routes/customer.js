import express from "express";
import { updateAddress } from "../controllers/customer.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/update-address", verifyUser, updateAddress);


export default router;