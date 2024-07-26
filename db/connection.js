import mongoose from "mongoose";

const Connect = async (req, res) => {
    try {
        await mongoose.connect(process.env.DB_conn)
        console.log('Connected to DB')
    } catch (error) {
        console.log(error)
    }
}

export default Connect