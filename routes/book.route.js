import { AddBook, UpdateBook, DeleteBook, get_all_books, get_all_books_limited, getbook } from "../controller/book.controller.js";
import express from "express"
import authenticateToken from "../middleware/authToken.js";

const router = express.Router()

router.post('/addbook', authenticateToken, AddBook)
router.put('/updatebook', authenticateToken, UpdateBook)
router.delete('/deletebook', authenticateToken, DeleteBook)
router.get('/allbooks', get_all_books)
router.get('/allbookslimited', get_all_books_limited)
router.get('/getbook/:id', getbook)

export default router;