import express from "express";
const router = express.Router();
import {addGuestWishlistItem,removeGuestWishlistItem,addToWishlist,removeFromWishlist,getMyWishlist} from "../Controllers/wishlistController.js";
        
import guestSessionMiddleware from '../Middleware/guestSessionMiddleware.js';// Import the guestSessionMiddleware module

//router.use(guestSessionMiddleware);

//router.post('/guest/wishlist/add', addGuestWishlistItem);
//router.delete('/guest/wishlist/remove/:productId', removeGuestWishlistItem);
router.post('/guest/wishlist/add', guestSessionMiddleware, addGuestWishlistItem);
router.delete('/guest/wishlist/remove/:productId', guestSessionMiddleware, removeGuestWishlistItem);

router.route("/client/wishlist/add/:id").post(guestSessionMiddleware, addToWishlist);


//router.route("/client/wishlist/add/:id").post(addToWishlist);
router.route("/client/wishlist/:id").get(getMyWishlist);
router.route("/client/wishlist/delete/:userId/:productId").delete(removeFromWishlist);


export default router;