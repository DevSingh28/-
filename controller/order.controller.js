import User from "../models/user.model.js";
import Order from "../models/order.model.js"


export const placeOrder = async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for (const orderdata of order) {
            const newOrder = new Order({
                user: id,
                book: orderdata._id
            })
            const neworderdata = await newOrder.save()

            await User.findByIdAndUpdate(id, {
                $push: {
                    order: neworderdata._id
                }

            })
            await User.findByIdAndUpdate(id, {
                $set: {
                    cart: []
                }})
        }
        return res.status(200).json({ message: 'Order Placed' })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }

}


export const orderHistory = async (req, res) => {
    try {
        const { id } = req.headers;

        const user = await User.findById(id).populate({
            path: "order",
            populate: { path: 'book' }
        })

        const history = user.order.reverse()

        return res.status(200).json({ message: "Success", data: history })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const allOrders = async (req, res) => {
    try {
        const allorder = await Order.find().populate({ path: 'book' }).populate({ path: 'user' }).sort({ createdAt: -1 })
        return res.status(200).json({ message: "Success", data: allorder })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res.status(400).json({ message: "You are not an admin" });
        }

        const { orderId } = req.params;
        await Order.findByIdAndUpdate(orderId, { status: req.body.status });
        return res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
        console.error("Error during updateStatus:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getOrderDetails = async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId).populate('user').populate('book');
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      return res.status(200).json({ data: order });
    } catch (error) {
      console.error('Error fetching order details:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };