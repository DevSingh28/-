import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: "Book"
    },
    status: {
        type: String,
        default: "Order Placed",
        enum: ["Order Placed", "Processing", "Out for Delivery", "Delivered"],
    },
    
}, {timestamps: true})

const Order = mongoose.model("Order", orderSchema)
export default Order