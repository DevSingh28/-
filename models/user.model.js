import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    address: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://picsum.photos/200",
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    favorites: [{
        type: mongoose.Types.ObjectId,
        ref: "Book",
    }],
    cart: [{
        type: mongoose.Types.ObjectId,
        ref: "Book",
    }],
    order: [{
        type: mongoose.Types.ObjectId,
        ref: "Order",
    }],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
