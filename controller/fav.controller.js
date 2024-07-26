import User from "../models/user.model.js";

export const add_to_fav = async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const user = await User.findById(id)
        const isavailable = user.favorites.includes(bookid)
        if (isavailable) {
            return res.status(200).json({ message: "Book is already in favorites" })
        }
        await User.findByIdAndUpdate(id, { $push: { favorites: bookid } })
        return res.status(200).json({ message: "Book added to Favorites" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const delete_from_fav = async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const user = await User.findById(id)
        const isavailable = user.favorites.includes(bookid)
        if (isavailable) {
            await User.findByIdAndUpdate(id, { $pull: { favorites: bookid } })
            return res.status(200).json({ message: "Book removed from Favorites" })
        }

        if (!isavailable) {
            return res.status(400).json({ message: "Book is not in you Favorites" })
        }


    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const get_all_books_for_user = async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id).populate('favorites');
        const fav_books = user ? user.favorites : [];
        
        if (fav_books.length > 0) {
            return res.status(200).json({ message: 'success', data: fav_books });
        } else {
            return res.status(200).json({ message: "No Books in Favorite", data: [] });
        }
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
