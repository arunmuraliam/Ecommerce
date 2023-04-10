import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
})

export default mongoose.model("Category", CategorySchema);