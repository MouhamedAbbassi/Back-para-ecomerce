import asyncHandler from "express-async-handler";
import Order from "../Models/OrderModel.js";
import * as OrderService from "../Services/OrderService.js";

// Create new order

const addorderitems = asyncHandler(async (req, res) => {
    // Here, the controller handles the request and response
    try {
      const createdOrder = await OrderService.createOrder(req.params.id, req.body);
      res.status(201).json(createdOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
    // get order by id
    
const getOrderById = asyncHandler(async (req, res) => {
    const order  = await Order.findById(req.params.id).populate("user","name email");
    if(order){
        res.json(order);
    }else{
        res.status(404);
        throw new Error("Order Not found");
    }
    
});
    // update order to paid
    const updateOrderToPaid = asyncHandler(async (req, res) => {
        try {
          const updatedOrder = await OrderService.updateOrderToPaid(req.params.id, req.body);
          res.json(updatedOrder);
        } catch (error) {
          res.status(404).json({ message: error.message });
        }
      });


// update order to delivered
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    // Here, the controller handles the request and response
    try {
      const updatedOrder = await OrderService.updateOrderToDelivered(req.params.id);
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