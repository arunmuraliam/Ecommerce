import express from "express";
import { addProduct, deleteProduct, getAllProducts, getProductByProductID, getProductsBySellerID, updateProduct } from "../controllers/product.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync("public")) {
            fs.mkdirSync("public");
        }
        if (file.fieldname === "image") {
            if (!fs.existsSync("public/media")) {
                fs.mkdirSync("public/media");
            }

            cb(null, "public/media");
        } else if (file.fieldname === "resources") {
            if (!fs.existsSync("public/resources")) {
                fs.mkdirSync("public/resources");
            }

            cb(null, "public/resources");
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname);

        if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
            return cb(new Error("Only Images are allowed!"));
        }

        cb(null, true);
    },
});

// Routes

router.get("/get-all-products", getAllProducts);

router.get("/get-products-by-seller/:id", getProductsBySellerID);

router.get("/get-product/:id", getProductByProductID);

router.post(
    "/add-product/:id",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "resources", maxCount: 5 },
    ]),
    
    addProduct
);

router.put(
    "/update-product/:id",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "resources", maxCount: 5 },
    ]),
    updateProduct
);

router.delete("/delete-product/:id", deleteProduct);

// router.post("/create-user", (req, res) => {
//     let user = req.body;
//     return res.status(201).json(user);
// })




export default router;