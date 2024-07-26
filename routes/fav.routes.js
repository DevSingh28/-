import { add_to_fav, delete_from_fav, get_all_books_for_user } from "../controller/fav.controller.js";
import express from "express"
import authenticateToken from "../middleware/authToken.js";

const router = express.Router()

router.put('/addtofav', authenticateToken, add_to_fav)
router.put('/removefromfav', authenticateToken, delete_from_fav)
router.get('/userallbooks', authenticateToken, get_all_books_for_user)


export default router