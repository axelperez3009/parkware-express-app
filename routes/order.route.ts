import express from "express";
import orderController from "../controllers/order.controller";

const router = express.Router();
router.post("/create", orderController.CreateOrder);
router.put("/update/:orderId", orderController.UpdateOrder);
router.get("/get/:orderId", orderController.getOrder);
router.delete("delete/:orderId", orderController.DeleteOrder);
export default router;
