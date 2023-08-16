import Order from "../Models/OrderModel.js";


// ///////////////////////////////////////////Create new order///////////////////////////////////

async function createOrder(userId, orderData) {

  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = orderData;

  if (!orderItems || orderItems.length === 0) {
    throw new Error("No order items");
  }

  const order = new Order({
    user: userId,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  });

  return order.save();
}
    ////////// update order to delivered

async function updateOrderToDelivered(orderId) {
  // The service handles the business logic for updating the order to delivered
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  return order.save();
}

 /////// update order to paid
async function updateOrderToPaid(orderId, paymentData) {
    const order = await Order.findById(orderId);
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
  
    return order.save();
  }
  

export{createOrder,updateOrderToDelivered,updateOrderToPaid}
