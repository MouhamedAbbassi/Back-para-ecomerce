import asyncHandler from "express-async-handler";
import Order from "../Models/OrderModel.js";
import * as OrderService from "../Services/OrderService.js";
import userSchema from '../Models/User.js';
//import getUserInfo from '../Controllers/ProfileController.js'
//import getUserRole from '../Controllers/ProfileController.js'

////////////////////////////////// Create new order //////////////////////////////

const addorderitems = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id ;
    const orderData = req.body; 
    const userData = await userSchema.findById(userId);
    const userRole = await userData.role ;
    const createdOrder = await OrderService.createOrder(userId, orderData, userRole);
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
  
    //////////////////////// get order by id //////////////////////////////////
    
    const getOrderById = asyncHandler(async (req, res, next) => {
      const orderId = req.params.id;
      const order = await OrderService.getOrderById(orderId);
  
      if (order) {
          res.json(order);
      } else {
          res.status(404).json({message:'Order Not found',err : error.message});
      }
  });

    //////////////////////////// Update order to paid //////////////////////////
const updateOrderToPaid = asyncHandler(async (req, res) => {
  try {
    const orderId = req.params.id; 
    const paymentData = req.body; 
     const order = await OrderService.getOrderById(orderId);
     if (!order) {
       return res.status(404).json({ message: "Order not found" });
     }
    const userId = order.user;
    const userData = await userSchema.findById(userId);
    const userRole = userData.role ;

    const updatedOrder = await OrderService.updateOrderToPaid(orderId, paymentData, userRole);
    res.json(updatedOrder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

///////////////////////// Update order to delivered //////////////////////////////////
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  try {
    const { id: orderId } = req.params; 
    const order = await OrderService.getOrderById(orderId);
     if (!order) {
       return res.status(404).json({ message: "Order not found" });
     }
    const userId = order.user;
    const userData = await userSchema.findById(userId);
    const userRole = userData.role ;
    const updatedOrder = await OrderService.updateOrderToDelivered(orderId, userRole);
    res.json(updatedOrder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

    //////////////////////////////// get my orders //////////////////////////
const getMyOrders = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;

    const orders = await OrderService.getOrdersByUserId(userId);
    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
////////////////////////////////// get orders //////////////////////////
    const GetOrders = asyncHandler(async (req, res) => {
        const orders  = await Order.find({}).populate("user","id name");
        res.json(orders);
        
    });
    
////////////////////////////// delete an order by ID /////////////////////
const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await OrderService.getOrderById(orderId);
     if (!order) {
       return res.status(404).json({ message: "Order not found" });
     }
    const userId = order.user;

    const deletedOrder = await OrderService.deleteOrderById(orderId, userId);
    if (deletedOrder) {
      res.json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
   
export {addorderitems,getOrderById,updateOrderToPaid,getMyOrders,GetOrders,updateOrderToDelivered,deleteOrder};