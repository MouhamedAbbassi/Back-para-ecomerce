import Order from "../Models/OrderModel.js";
import OrderAdmin from "../Models/OrderAdmin.js";
import userSchema from "../Models/User.js";
// ///////////////////////////////////////////Create new order///////////////////////////////////

async function createOrder(userId, orderData, userRole) {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = orderData;

  if (!orderItems || orderItems.length === 0) {
    throw new Error("No order items");
  }

  let orderModel;
  if (userRole === "client") {
    orderModel = Order;
  } else if (userRole === "admin") {
    orderModel = OrderAdmin;
  } else {
    throw new Error("Invalid user role");
  }

  const order = new orderModel({
    user: userId,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  });

  if (userRole === "admin") {
    order.isOrderedByAdmin = true;
    order.adminUser = userId;
  }

  return order.save();
}

///////////////////////////////////update Order To Delivered ////////////////////////////////////////

async function updateOrderToDelivered(orderId, userRole) {
  let orderModel;
  if (userRole === "client") {
    orderModel = Order;
  } else if (userRole === "admin") {
    orderModel = OrderAdmin;
  } else {
    throw new Error("Invalid user role");
  }

  const order = await orderModel.findById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  if (userRole === "admin") {
    order.isDeliveredByAdmin = true;
    order.deliveredAtByAdmin = Date.now();
  } else if (userRole === "fournisseur") {
    order.isDeliveredBySupplier = true;
    order.deliveredAtBySupplier = Date.now();
  }

  return order.save();
}
///////////////////////////////////////// update Order To Paid /////////////////////////////////////////////////
async function updateOrderToPaid(orderId, paymentData, userRole) {
  let orderModel;
  if (userRole === "client") {
    orderModel = Order;
  } else if (userRole === "admin") {
    orderModel = OrderAdmin;
  } else {
    throw new Error("Invalid user role");
  }

  const order = await orderModel.findById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: paymentData.id,
    status: paymentData.status,
    update_time: paymentData.update_time,
    // email_address: paymentData.payer.email_address,
  };

  if (userRole === "admin") {
    // Additional logic for admin orders
  } else if (userRole === "fournisseur") {
    // Additional logic for fournisseur orders
  }

  return order.save();
}
////////////////////////////// get Order By Id ////////////////////////////////////
const getOrderById = async (orderId) => {
  const orderExistsInOrderCollection = await Order.exists({ _id: orderId });
  const orderExistsInOrderAdminCollection = await OrderAdmin.exists({ _id: orderId });

  if (orderExistsInOrderCollection) {
    return Order.findById(orderId).populate('user', 'name email');
  } else if (orderExistsInOrderAdminCollection) {
    return OrderAdmin.findById(orderId).populate('user', 'name email');
  } else {
    return null; // Order not found in either collection
  }
};

////////////////////////////// get Order By user Id ////////////////////////////////////

const getOrdersByUserId = async (userId) => {

  const userData = await userSchema.findById(userId);
  const userRole = userData.role ;
  const isAdmin = userRole === "admin";

  const OrderModel = isAdmin ? OrderAdmin : Order;

  const orders = await OrderModel.find({ user: userId }).populate('user', 'name email');

  return orders;
};
/////////////////////////////// Delete an order by ID ////////////////////////////////////

const deleteOrderById = async (orderId, userId) => {
  const userData = await userSchema.findById(userId);
  const userRole = userData.role ;
  const isAdmin = userRole === "admin";

  const OrderModel = isAdmin ? OrderAdmin : Order;

  const deletedOrder = await OrderModel.findByIdAndDelete(orderId);

  return deletedOrder;
};


export{createOrder,updateOrderToDelivered,updateOrderToPaid,getOrderById,getOrdersByUserId,deleteOrderById};
