import { Router } from "express";
import {
  addToCart,
  fetchAllCartItems,
  removeItem,
  changeQuantity,
} from "../Controllers/CartController.js";
import { protect } from "../Middlewares/verifyToken.js";

const router = Router();
/**
 * @swagger
 * /cart/add-item/{userId}/{productId}:
 *   post:
 *     summary: Add a product to the cart.
 *     tags:
 *       - Cart
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: User ID for the cart owner.
 *         schema:
 *           type: string
 *       - name: productId
 *         in: path
 *         required: true
 *         description: Product ID to be added to the cart.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product successfully added to the cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                   example: []
 *                 message:
 *                   type: string
 *                   example: Product added to cart
 *       400:
 *         description: Error occurred while adding the product to the cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error message describing the issue
 *     security:
 *       - bearerAuth: []   
 */

router.post("/cart/add-item/:userId/:productId", protect, addToCart);

 
/**
 * @swagger
 * /cart/fetch-cart/{userId}:
 *   get:
 *     summary: Fetch all items in the user's cart.
 *     tags:
 *       - Cart
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: User ID to fetch the cart items for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart items successfully fetched.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                   example: []
 *       400:
 *         description: Error occurred while fetching the cart items.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error message describing the issue
 */
router.get("/cart/fetch-cart/:userId", protect, fetchAllCartItems);

/**
 * @swagger
 * /cart/remove-item/{userId}/{productId}:
 *   delete:
 *     summary: Remove a product from the cart.
 *     tags:
 *       - Cart
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: User ID to remove the product from their cart.
 *         schema:
 *           type: string
 *       - name: productId
 *         in: path
 *         required: true
 *         description: Product ID to be removed from the cart.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product successfully removed from the cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                   example: []
 *                 message:
 *                   type: string
 *                   example: Product removed from cart
 *       400:
 *         description: Error occurred while removing the product from the cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error message describing the issue
 */
router.delete("/cart/remove-item/:userId/:productId", protect, removeItem);

/**
 * @swagger
 * /cart/update-quantity/{userId}:
 *   post:
 *     summary: Update the quantity of a product in the cart.
 *     tags:
 *       - Cart
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: User ID to update the cart item quantity for.
 *         schema:
 *           type: string
 *       - name: productId
 *         in: body
 *         required: true
 *         description: Product ID to update the quantity for.
 *         schema:
 *           type: string
 *       - name: quantity
 *         in: body
 *         required: true
 *         description: New quantity for the product.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Product quantity successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                   example: []
 *                 message:
 *                   type: string
 *                   example: Product quantity changed
 *       400:
 *         description: Error occurred while updating the product quantity in the cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error message describing the issue
 */
router.post("/cart/update-quantity/:userId", protect, changeQuantity);

export default router;
