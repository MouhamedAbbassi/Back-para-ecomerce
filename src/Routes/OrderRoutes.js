import express from "express";
const router = express.Router();
import { addorderitems, GetMyOrders, getOrderById, GetOrders, updateOrderToPaid,updateOrderToDelivered } from "../Controllers/OrderController.js";
import { client, admin } from '../Middleware/Authorization.js';

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API to manage orders.
 */

/**
 * @swagger
 * /orders/create/{id}:
 *   post:
 *     summary: Create a new order.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to associate with the order.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Order details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       example: "64c3d49a6d3fb0e9e6d43917"
 *                     qty:
 *                       type: integer
 *                       example: 2
 *                     price:
 *                       type: number
 *                       example: 99
 *                     name:
 *                       type: string
 *                       example: "swagger_test_1"
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                     example: "123 Main St"
 *                   city:
 *                     type: string
 *                     example: "Cityville"
 *                   postalCode:
 *                     type: string
 *                     example: "12345"
 *                   country:
 *                     type: string
 *                     example: "Countryland"
 *     responses:
 *       '201':
 *         description: The created order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Bad request. No order items provided.
 */
router.route("/orders/create/:id").post(client,admin,addorderitems);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders.
 *     tags: [Orders]
 *     responses:
 *       '200':
 *         description: A list of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.route("/orders").get(admin,GetOrders);

/**
 * @swagger
 * /myorders/{id}:
 *   get:
 *     summary: Get orders of a specific user.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of orders for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       '404':
 *         description: User not found.
 */
router.route("/myorders/:id").get(client,admin,GetMyOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get a specific order by ID.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The requested order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '404':
 *         description: Order not found.
 */
router.route("/orders/:id").get(client,getOrderById);

/**
 * @swagger
 * /orders/{id}/pay:
 *   put:
 *     summary: Update an order to paid.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order to update.
 *         schema:
 *           type: string
 *     
 *     responses:
 *       '200':
 *         description: The updated order with payment details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '404':
 *         description: Order not found.
 */
router.route("/orders/:id/pay").put(client,updateOrderToPaid);

/**
 * @swagger
 * /orders/{id}/deliver:
 *   put:
 *     summary: Update an order to delivered.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order to update.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The updated order with the delivery status.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '404':
 *         description: Order not found.
 */
router.route("/orders/:id/deliver").put(client,admin,updateOrderToDelivered);

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64c3d49a6d3fb0e9e6d43917"
 *         orderItems:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 example: "64c3d49a6d3fb0e9e6d43917"
 *               qty:
 *                 type: integer
 *                 example: 2
 *               price:
 *                 type: number
 *                 example: 99
 *               name:
 *                 type: string
 *                 example: "swagger_test_1"
 *         shippingAddress:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *               example: "123 Main St"
 *             city:
 *               type: string
 *               example: "Cityville"
 *             postalCode:
 *               type: string
 *               example: "12345"
 *             country:
 *               type: string
 *               example: "Countryland"
 *         paymentMethod:
 *           type: string
 *           example: "PayPal"
 *         itemsPrice:
 *           type: number
 *           example: 130
 *         taxPrice:
 *           type: number
 *           example: 10
 *         shippingPrice:
 *           type: number
 *           example: 15
 *         totalPrice:
 *           type: number
 *           example: 155
 */


export default router;