import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    productID: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default:1
    },
    sellerID: {
        type: String,
    },
})

const CartSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    products: [ProductsSchema],
})

export default mongoose.model("Cart", CartSchema);