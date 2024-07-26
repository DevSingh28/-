import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

// User Registration
export const Register = async (req, res) => {
    try {
        const { email, username, password, address } = req.body;

        const already_user = await User.findOne({ email: email });
        if (already_user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const new_user = new User({
            email,
            password: hashedPassword,
            username,
            address
        });

        await new_user.save();
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// User Login
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const is_matched = await bcryptjs.compare(password, user.password);

        if (!is_matched) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_TOKEN,
            { expiresIn: '7d' }
        );
        return res.status(200).json({
            message: 'Login Successful',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: token
            }
            });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const GetData = async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json({message: "User Data Exists", data})
    } catch (error) {
        console.error("Error during GetData:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const Update_add = async (req, res) => {
    try {
        const { id } = req.headers;
        const { address } = req.body;
        await User.findByIdAndUpdate(id, {address: address})
        return res.status(200).json({message: "Address Updated Successfully"})
    } catch (error) {
        console.error("Error during Address_Update:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}