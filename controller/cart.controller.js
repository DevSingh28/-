import User from "../models/user.model.js";

export const add_to_cart = async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const user = await User.findById(id)
        const isavailable = user.cart.includes(bookid)
        if (isavailable) {
            return res.status(200).json({ message: "Book is already in Cart" })
        }
        await User.findByIdAndUpdate(id, { $push: { cart: bookid } })
        return res.status(200).json({ message: "Book added to Cart" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const delete_from_cart = async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const user = await User.findById(id)
        const isavailable = user.cart.includes(bookid)
        if (isavailable) {
            await User.findByIdAndUpdate(id, { $pull: { cart: bookid } })
            return res.status(200).json({ message: "Book removed from cart" })
        }

        if (!isavailable) {
            return res.status(400).json({ message: "Book is not in you cart" })
        }


    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const get_all_cart_for_user = async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id).populate('cart')
        const fav_books = user.cart.reverse();
        if (fav_books.length > 0) {
            return res.status(200).json({ message: 'success', data: fav_books })
        }
        else {
            return res.status(500).json({ message: "No Books in cart" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}