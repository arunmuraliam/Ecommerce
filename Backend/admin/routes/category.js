import express from "express";
import { addCategory, deleteCategory, getCategory } from "../controllers/category.js";
import { verifyAdmin } from "../../seller/utils/verifyToken.js";


const router = express.Router();

router.post("/add-category", verifyAdmin, addCategory);
router.get("/get-category", getCategory);
router.delete("/delete-category/:categoryID", deleteCategory);

export default router;