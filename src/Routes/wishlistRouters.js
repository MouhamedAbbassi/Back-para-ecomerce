import express from "express";
const router = express.Router();
import {addGuestWishlistItem,removeGuestWishlistItem,addToWishlist,removeFromWishlist,getMyWishlist,getGuestWishlist} from "../Controllers/wishlistController.js";
        
import guestSessionMiddleware from '../Middleware/guestSessionMiddleware.js';


router.post('/guest/wishlist/add', guestSessionMiddleware, addGuestWishlistItem);
router.delete('/guest/wishlist/remove/:productId', guestSessionMiddleware, removeGuestWishlistItem);

router.route("/client/wishlist/add/:id").post(guestSessionMiddleware, addToWishlist);


router.route("/client/wishlist/:id").get(getMyWishlist);
router.route("/client/wishlist/delete/:userId/:productId").delete(removeFromWishlist);

router.get("/guest/wishlist", guestSessionMiddleware, getGuestWishlist);
router.get('/test-session', (req, res) => {
    console.log('Session guestId:', req.session.guestId);
    res.send('Check the console logs for session data.');
});

export default router;