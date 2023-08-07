import asyncHandler from "express-async-handler";
//import User from "../Models/Client.js";
import { addToClientWishlist, moveItemsFromGuestWishlist,removeFromClientWishlist,removeFromGuestWishlist,getClientWishlist,addToGuestWishlist,getGuestWishlistS} from "../Services/wishlistService.js";
import  generateTemporaryGuestId  from "../Services/wishlistService.js";

/////////////////////////////////for a client user //////////////////////////////

//////////////////////Add a product to the client's wishlist
const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.params.id;
  const guestId = req.session.guestId;
  const guestSessionId = req.session.guestSessionId;

  // Check if the guest has become a client
  if (userId && guestId && guestSessionId === req.sessionID) {
    try {
      await moveItemsFromGuestWishlist(userId, guestId);

      // Clear the guest identifiers from the session
      req.session.guestId = null;
      req.session.guestSessionId = null;
    } catch (error) {
      console.error("Error moving items from guest wishlist:", error);
    }
  }

  await addToClientWishlist(userId, productId);

  res.status(201).json({ message: "Item added to wishlist" });
});



/////////////////////// Remove a product from the client's wishlist

const removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId, userId } = req.params;

  const removed = await removeFromClientWishlist(userId, productId);

  if (!removed) {
    return res.status(404).json({
       error: "Item not found in wishlist"
    });
  }

  res.json({ message: "Item removed from wishlist" });
});

////////////////////// Get the client's wishlist

const getMyWishlist = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const wishlist = await getClientWishlist(userId);

    if (!wishlist) {
      return res.status(404).json({
        status: "error",
        message: "Wishlist not found",
      });
    }

    res.status(200).json({
      status: "success",
      results: wishlist.products.length,
      data: wishlist.products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

  
  /////////////////////////////////////////////////////////////////////////
  /////////////////////for Guest///////////////////////////////////////

 ////////////////Add a product to the guest's wishlist
 const addGuestWishlistItem = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.body;
    const guestId = req.session.guestId || generateTemporaryGuestId(); 

    console.log("productId:", productId);
    console.log("guestId:", guestId);

    const result = await addToGuestWishlist(productId, guestId);

    if (result.success) {
      return res.status(201).json({ message: result.message });
    } else {
      if (result.message === "Product is already in the guest wishlist") {
        return res.status(400).json({ error: result.message });
      } else {
        return res.status(500).json({ error: result.error });
      }
    }
  } catch (error) {
    console.error("Error adding wishlist item:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});



  /////////////remove a product from the guest's wishlist
  
  const removeGuestWishlistItem = asyncHandler(async (req, res) => {
    try {
      const { productId } = req.params;
      const guestId = req.session.guestId;
  
      console.log("productId:", productId);
      console.log("guestId:", guestId);
  
      const result = await removeFromGuestWishlist(productId, guestId);
  
      if (result.success) {
        return res.json({ message: result.message });
      } else {
        return res.status(404).json({ error: result.message });
      }
    } catch (error) {
      console.error("Error removing wishlist item:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  
    //////////////////get the Guest's wishlist
    
    const getGuestWishlist = asyncHandler(async (req, res) => {
      try {
        const guestId = req.session.guestId;
    
        const result = await getGuestWishlistS(guestId);
    
        if (result.success) {
          const wishlist = result.wishlist;
          return res.status(200).json({
            status: "success",
            results: wishlist.products.length,
            data: wishlist.products,
          });
        } else {
          return res.status(404).json({
            status: "error",
            message: result.message,
          });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          status: "error",
          message: "Internal server error",
        });
      }
    });
    
    
    


export {addGuestWishlistItem,removeGuestWishlistItem,addToWishlist,removeFromWishlist,getMyWishlist,getGuestWishlist};