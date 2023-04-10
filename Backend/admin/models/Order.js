import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userID: {
        type: String,
    },
    products: {
        type: Array,
    },
    amount: {
        type: Number,
    },
    deliveryAddress: {
        type: String,
    },
    mobile: {
        type: Number,
    },
    paymentMode: {
        type: String,
    },
    orderStatus: {
        type: String,
        default:"pending",
    },
    deliveryStatus: {
        type: String,
    },
    paymentStatus: {
        type: String,
    },
    razorpayOrderID: {
        type: String,
    },
    razorpayPaymentID: {
        type: String,
    },
})

export default mongoose.model("Order", OrderSchema);