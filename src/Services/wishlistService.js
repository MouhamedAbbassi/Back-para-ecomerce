import ClientWishlist from "../Models/ClientwishlistModel.js";
import GuestWishlist from "../Models/GuestwishlistModel.js";
import { v4 as uuidv4 } from "uuid";
import asyncHandler from "express-async-handler";




async function addToClientWishlist(userId, productId) {
  const wishlist = await ClientWishlist.findOne({ userId });

  if (!wishlist) {
    console.log("Creating a new wishlist...");
    const newWishlist = new ClientWishlist({ userId, products: [productId] });
    await newWishlist.save();
  } else {
    if (!wishlist.products.includes(productId)) {
      console.log("Adding product to existing wishlist...");
      wishlist.products.push(productId);
      await wishlist.save();
    }
  }
}

async function moveItemsFromGuestWishlist(userId, guestId) {
  const guestWishlist = await GuestWishlist.findOne({ guestId });
  const clientWishlist = await ClientWishlist.findOne({ userId });

  if (guestWishlist && clientWishlist) {
    clientWishlist.products.push(...guestWishlist.products);
    await clientWishlist.save();

    await GuestWishlist.deleteOne({ guestId: guestId });
  }
}


////////////////////// Remove a product from the client's wishlist

const removeFromClientWishlist = asyncHandler(async (userId, productId) => {
  const wishlist = await ClientWishlist.findOne({ userId });

  if (!wishlist || !wishlist.products.includes(productId)) {
    return false; // Item not found
  }

  wishlist.products = wishlist.products.filter(item => item.toString() !== productId);
  await wishlist.save();

  return true; // Item removed successfully
});

//////////////////////////// Get the client's wishlist

const getClientWishlist = asyncHandler(async (userId) => {
    try {
      const wishlist = await ClientWishlist.findOne({ userId }).populate("products");
      return wishlist;
    } catch (err) {
      throw new Error("Error fetching client wishlist");
    }
  });

////////////////////// generate Temporary GuestId 
  

  export default function generateTemporaryGuestId() {
    return "guest_" + uuidv4();
  }
  //////////////////////Add a product to the guest's wishlist
  async function addToGuestWishlist(productId, guestId) {
    try {
      let guestWishlist = await GuestWishlist.findOne({ guestId });
  
      if (!guestWishlist) {
        guestWishlist = new GuestWishlist({ guestId, products: [] });
      }
  
      
      if (guestWishlist.products.includes(productId)) {
        return { success: false, message: "Product is already in the guest wishlist" };
      }
  
      guestWishlist.products.push(productId);
      await guestWishlist.save();
  
      return { success: true, message: "Item added to guest wishlist" };
    } catch (error) {
      console.error("Error adding wishlist item:", error);
      return { success: false, error: "Internal server error" };
    }
  }
  //////////////////////remove a product from the guest's wishlist

 async function removeFromGuestWishlist(productId, guestId) {
    try {
      const guestWishlist = await GuestWishlist.findOne({ guestId });
      
      if (!guestWishlist || !guestWishlist.products.includes(productId)) {
        return { success: false, message: "Item not found in guest wishlist" };
      }
  
      guestWishlist.products = guestWishlist.products.filter(item => item.toString() !== productId);
      await guestWishlist.save();
  
      return { success: true, message: "Item removed from guest wishlist" };
    } catch (error) {
      console.error("Error removing wishlist item:", error);
      return { success: false, error: "Internal server error" };
    }
  }
  //////////////Get the guest's wishlist

  async function getGuestWishlistS(guestId) {
    try {
      const wishlist = await GuestWishlist.findOne({ guestId }).populate("products");
  
      if (!wishlist) {
        return {
          success: false,
          message: "Guest wishlist not found",
        };
      }
  
      return {
        success: true,
        wishlist,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Internal server error",
      };
    }
  }
  

export { addToClientWishlist,addToGuestWishlist,moveItemsFromGuestWishlist,removeFromClientWishlist,removeFromGuestWishlist,getClientWishlist,getGuestWishlistS};
