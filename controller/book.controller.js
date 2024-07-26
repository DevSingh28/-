import User from "../models/user.model.js";
import Book from "../models/book.model.js";

export const AddBook = async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res.status(400).json({ message: "You are not an admin" });
        }

        const new_book = new Book({
            url: req.body.url,
            author: req.body.author,
            title: req.body.title,
            desc: req.body.desc,
            price: req.body.price,
            language: req.body.language
        });

        if (new_book) {
            await new_book.save();
            return res.status(200).json({ message: "New book added successfully" });
        } else {
            return res.status(400).json({ message: "Some error occurred while saving the book!" });
        }
    } catch (error) {
        console.error("Error during AddBook:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const UpdateBook = async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res.status(400).json({ message: "You are not an admin" });
        }

        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            author: req.body.author,
            title: req.body.title,
            desc: req.body.desc,
            price: req.body.price,
            language: req.body.language
        });

        return res.status(200).json({ message: "Book updated successfully" });

    } catch (error) {
        console.error("Error during UpdateBook:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const DeleteBook = async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res.status(400).json({ message: "You are not an admin" });
        }

        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "Book deleted successfully" });
        
    } catch (error) {
        console.error("Error during DeleteBook:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const get_all_books = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.status(200).json({message: "Success", data: books})

    } catch (error) {
        console.error("Error during get_all_books:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const get_all_books_limited = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(6)
        return res.status(200).json({message: "Success", data: books})

    } catch (error) {
        console.error("Error during get_all_books:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const getbook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id)
        return res.status(200).json({message: "Success", data: book})

    } catch (error) {
        console.error("Error during getbook:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

