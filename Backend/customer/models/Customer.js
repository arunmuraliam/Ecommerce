import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
    },
    address: {
        type: String,
    },
    state: {
        type: String,
    },
    district: {
        type: String,
    },
    
})

export default mongoose.model("Customer", CustomerSchema);