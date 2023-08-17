import asyncHandler from "express-async-handler";
import Order from "../Models/OrderModel.js";
import * as OrderService from "../Services/OrderService.js";
import userSchema from '../Models/User.js';
//import getUserInfo from '../Controllers/ProfileController.js'
import getUserRole from '../Controllers/ProfileController.js'
////////////////////////////////// Create new order //////////////////////////////

const addorderitems = asyncHandler(async (req, res) => {
  try {
    console.log("req.params:", req.params);
    const { id: userId } = req.params; 
    console.log("userId:", userId); 
    const orderData = req.body; 
    const userRole = await getUserRole(userId);
    console.log("userRole:", userRole);
    const createdOrder = await OrderService.createOrder(userId, orderData, userRole);
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
  
    //////////////////////// get order by id //////////////////////////////////
    
const getOrderById = asyncHandler(async (req, res) => {
    const order  = await Order.findById(req.params.id).populate("user","name email");
    if(order){
        res.json(order);
    }else{
        res.status(404);
        throw new Error("Order Not found");
    }
    
});
    //////////////////////////// Update order to paid //////////////////////////
const updateOrderToPaid = asyncHandler(async (req, res) => {
  try {
    const { id: orderId } = req.params; 
    const paymentData = req.body; 
    const userRole = req.user.role; 

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
    const userRole = req.user.role; 

    const updatedOrder = await OrderService.updateOrderToDelivered(orderId, userRole);
    res.json(updatedOrder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

    // get logged in user orders
const GetMyOrders = asyncHandler(async (req, res) => {
    const orders  = await Order.find({user: req.params.id});
    res.json(orders);
    
});

// get orders
    const GetOrders = asyncHandler(async (req, res) => {
        const orders  = await Order.find({}).populate("user","id name");
        res.json(orders);
        
    });
    
export {addorderitems,getOrderById,updateOrderToPaid,GetMyOrders,GetOrders,updateOrderToDelivered};