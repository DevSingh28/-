import express from "express"
import authenticateToken from "../middleware/authToken.js";
import { placeOrder, allOrders, updateStatus, orderHistory, getOrderDetails } from "../controller/order.controller.js";

const router = express.Router()

router.post("/placeorder", authenticateToken, placeOrder)
router.get("/orderhistory", authenticateToken, orderHistory)
router.get("/allorder", authenticateToken, allOrders)
router.put("/updateorder/:orderId", authenticateToken, updateStatus)
router.get('/viewuser/:orderId', authenticateToken, getOrderDetails);

export default router;
