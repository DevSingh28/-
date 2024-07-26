import { add_to_cart, delete_from_cart, get_all_cart_for_user } from "../controller/cart.controller.js";
import express from "express"
import authenticateToken from "../middleware/authToken.js";

const router = express.Router()

router.put("/bookadd", authenticateToken, add_to_cart)
router.put("/bookremove", authenticateToken, delete_from_cart)
router.get("/bookall", authenticateToken, get_all_cart_for_user)

export default router