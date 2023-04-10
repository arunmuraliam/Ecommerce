import express from "express";
import { adminLogin, adminSignup, logout } from "../controllers/auth.js";

const router = express.Router();

router.post("/admin-signup", adminSignup);
router.post("/admin-login", adminLogin);
router.put("/logout", logout)


export default router;