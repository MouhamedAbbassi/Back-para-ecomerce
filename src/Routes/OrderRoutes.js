import express from "express";
const router = express.Router();
import { addorderitems, GetMyOrders, getOrderById, GetOrders, updateOrderToPaid,updateOrderToDelivered } from "../controlers/orderControler.js";


 router.route("/orders/create").post(addorderitems);
 router.route("/orders").get(GetOrders);
router.route("/myorders").get(GetMyOrders); 
router.route("/orders/:id").get(getOrderById); 
router.route("/orders/:id/pay").put(updateOrderToPaid); 
router.route("/orders/:id/deliver").put(updateOrderToDelivered); 


export default router;