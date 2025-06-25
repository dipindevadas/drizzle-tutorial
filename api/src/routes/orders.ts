import express from "express";
import { createOrder } from "../controllers/orders";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();

router.post("/", verifyToken, createOrder);
export default router;
