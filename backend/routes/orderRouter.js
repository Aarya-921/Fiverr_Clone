import express from "express";
import { intent, getOrders, confirm } from "../controllers/orderController.js";
import { verifyToken } from "../middleware/jwt.js";
const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder)
router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:gigId", verifyToken, intent); //yaha pe order create hota hai //:gigId wala route aur controller k andar req.params.gigId dono same name gigId se hone chiye ya phir :id nahi to error deta hai
router.put("/", verifyToken, confirm);

export default router;