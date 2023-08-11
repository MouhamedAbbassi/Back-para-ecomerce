import express from "express";
const router = express.Router();
import {addGuestWishlistItem,removeGuestWishlistItem,addToWishlist,removeFromWishlist,getMyWishlist,getGuestWishlist} from "../Controllers/wishlistController.js";
        
import guestSessionMiddleware from '../Middleware/guestSessionMiddleware.js';


/**
 * @swagger
 * tags:
 *   name: Wishlists
 *   description: API to manage Wishlists.
 */

/**
 * @swagger
 * /guest/wishlist/add:
 *   post:
 *     summary: Add a product to the guest's wishlist
 *     tags: [Wishlists]
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to add to the wishlist
 *                 example: 64c8be7472aa75ad74138124
 *     responses:
 *       201:
 *         description: Item added to guest wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *                   example: Item added to guest wishlist
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Internal server error
 */
router.post('/guest/wishlist/add', guestSessionMiddleware, addGuestWishlistItem);

/**
 * @swagger
 * /guest/wishlist/remove/{productId}:
 *   delete:
 *     summary: Remove a product from the guest's wishlist
 *     tags: [Wishlists]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to remove from the wishlist
 *         example: 64c8be7472aa75ad74138124
 *     responses:
 *       200:
 *         description: Item removed from guest wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *                   example: Item removed from guest wishlist
 *       404:
 *         description: Item not found in guest wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Item not found in guest wishlist
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Internal server error
 */
router.delete('/guest/wishlist/remove/:productId', guestSessionMiddleware, removeGuestWishlistItem);

/**
 * @swagger
 * /guest/wishlist:
 *   get:
 *     summary: Get the guest's wishlist
 *     tags: [Wishlists]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Guest wishlist retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status message
 *                   example: success
 *                 results:
 *                   type: number
 *                   description: Number of wishlist items
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: Product IDs in the wishlist
 *                     example: ["xyz123", "abc456"]
 *       404:
 *         description: Guest wishlist not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status message
 *                   example: error
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Guest wishlist not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status message
 *                   example: error
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Internal server error
 */
router.get("/guest/wishlist", guestSessionMiddleware, getGuestWishlist);


/**
 * @swagger
 * /client/wishlist/add/{id}:
 *   post:
 *     summary: Add a product to the client's wishlist
 *     tags: [Wishlists]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the client
 *         example: abc123
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             productId:
 *               type: string
 *               description: The ID of the product to add to the wishlist
 *               example: xyz456
 *         description: The product ID to add to the wishlist
 *     responses:
 *       201:
 *         description: Item added to client wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *                   example: Item added to wishlist
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Internal server error
 */

router.route("/client/wishlist/add/:id").post(guestSessionMiddleware, addToWishlist);

/**
 * @swagger
 * /client/wishlist/{id}:
 *   get:
 *     summary: Get the client's wishlist
 *     tags: [Wishlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Client's user ID
 *     responses:
 *       200:
 *         description: Client wishlist retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status message
 *                   example: success
 *                 results:
 *                   type: number
 *                   description: Number of wishlist items
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: Product IDs in the wishlist
 *                     example: ["xyz123", "abc456", "def789"]
 *       404:
 *         description: Wishlist not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status message
 *                   example: error
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Wishlist not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status message
 *                   example: error
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Internal server error
 */
router.route("/client/wishlist/:id").get(getMyWishlist);

/**
 * @swagger
 * /client/wishlist/delete/{userId}/{productId}:
 *   delete:
 *     summary: Remove a product from the client's wishlist
 *     tags: [ Wishlists]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: Client's user ID
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to remove
 *     responses:
 *       200:
 *         description: Product removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Item removed from wishlist
 *       404:
 *         description: Product not found in the wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Item not found in wishlist
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Internal server error
 */
router.route("/client/wishlist/delete/:userId/:productId").delete(removeFromWishlist);


router.get('/test-session', (req, res) => {
    console.log('Session guestId:', req.session.guestId);
    res.send('Check the console logs for session data.');
});

export default router;