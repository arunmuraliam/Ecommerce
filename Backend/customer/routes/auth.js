import express from "express";
import { customerLogin, customerSignup, logout } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", customerSignup);
router.post("/login", customerLogin);
router.put("/logout", logout)


export default router;