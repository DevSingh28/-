import { Login, Register, GetData, Update_add } from "../controller/user.controller.js";
import express from "express"
import authenticateToken from "../middleware/authToken.js";

const router = express.Router()


router.post("/register", Register)
router.post("/login", Login)
router.get('/user-info', authenticateToken, GetData)
router.put('/update-address', authenticateToken, Update_add)

export default router
