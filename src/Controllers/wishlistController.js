import asyncHandler from "express-async-handler";
//import User from "../Models/Client.js";
//import wishlist from "../Models/wishlistModel.js";
import ClientWishlist from '../Models/ClientwishlistModel.js';
import GuestWishlist from '../Models/GuestwishlistModel.js';

/////////////////////////////////for a client user //////////////////////////////
//Add a product to the client's wishlist
const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.params.id;
  const guestId = req.session.guestId;
  const guestSessionId = req.session.guestSessionId;

  // Check if the guest has become a client
  if (userId && guestId && guestSessionId === req.sessionID) {
    try {
      // Move items from guest wishlist to client wishlist
      const guestWishlist = await GuestWishlist.findOne({ guestId });
      const clientWishlist = await ClientWishlist.findOne({ userId });

      if (guestWishlist && clientWishlist) {
        clientWishlist.products.push(...guestWishlist.products);
        await clientWishlist.save();
        await GuestWishlist.deleteOne({ guestId: guestId }); // Remove guest wishlist
      }

      // Clear the guest identifiers from the session
      req.session.guestId = null;
      req.session.guestSessionId = null;
    } catch (error) {
      console.error('Error moving items from guest wishlist:', error);
    }
  }

  // Continue with adding the item to the client wishlist
  const wishlist = await ClientWishlist.findOne({ userId });

  if (!wishlist) {
    console.log('Creating a new wishlist...');
    const newWishlist = new ClientWishlist({ userId, products: [productId] });
    await newWishlist.save();

    res.status(201).json({ message: 'Item added to wishlist' });
  } else {
    if (wishlist.products.includes(productId)) {
      console.log('Product already in the wishlist...');
      res.status(400).json({ error: 'Product already in the wishlist' });
    } else {
      console.log('Adding product to existing wishlist...');
      wishlist.products.push(productId);
      await wishlist.save();
      res.status(201).json({ message: 'Item added to wishlist' });
    }
  }
});




// Remove a product from the client's wishlist
const removeFromWishlist = asyncHandler(async (req, res) => {
  
  const { productId, userId } = req.params;
  const wishlist = await ClientWishlist.findOne({ userId });

  if (!wishlist || !wishlist.products.includes(productId)) {
    return res.status(404).json({
       error: 'Item not found in wishlist',
       wishlistProducts: wishlist ? wishlist.products : []
      });
  }

  wishlist.products = wishlist.products.filter(item => item.toString() !== productId);
  await wishlist.save();

  res.json({ message: 'Item removed from wishlist' });
});

// Get the client's wishlist
const getMyWishlist = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;

    const wishlist = await ClientWishlist.findOne({ userId }).populate('products');

    if (!wishlist) {
      return res.status(404).json({
        status: 'error',
        message: 'Wishlist not found',
      });
    }

    res.status(200).json({
      status: 'success',
      results: wishlist.products.length,
      data: wishlist.products,
    });
  } catch (err) {
    console.error(err);
    // Handle any errors that occurred during the try block
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

  
  /////////////////////////////////////////////////////////////////////////
  /////////////////////for Guest///////////////////////////////////////
  //const uuid = require('uuid');
  import { v4 as uuidv4 } from 'uuid';

  export default function generateTemporaryGuestId() {
    return 'guest_' + uuidv4();
  }

  async function addGuestWishlistItem(req, res) {
    try {
      const { productId } = req.body;
  
      // Session ID or generate a temporary unique identifier
      const guestId = req.session.guestId || generateTemporaryGuestId();
  
      console.log('productId:', productId);
      console.log('guestId:', guestId);
  
      // Find or create a guest wishlist based on the guestId
      let guestWishlist = await GuestWishlist.findOne({ guestId });
  
      if (!guestWishlist) {
        guestWishlist = new GuestWishlist({ guestId, products: [] }); // Fixed the field name here
      }
  
      // Add the product to the guest wishlist
      guestWishlist.products.push(productId);
      await guestWishlist.save();
  
      return res.status(201).json({ message: 'Item added to guest wishlist' });
    } catch (error) {
      console.error('Error adding wishlist item:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  async function removeGuestWishlistItem(req, res) {
    try {
      const { productId } = req.params;
      const guestId = req.session.guestId;
  
      console.log('productId:', productId);
      console.log('guestId:', guestId);
  
      const guestWishlist = await GuestWishlist.findOne({ guestId }); // Fixed the model name here
      console.log('guestWishlist:', guestWishlist);
  
      if (!guestWishlist || !guestWishlist.products.includes(productId)) {
        return res.status(404).json({ error: 'Item not found in guest wishlist' });
      }
  
      // Remove the product from the guest wishlist
      guestWishlist.products = guestWishlist.products.filter(item => item.toString() !== productId);
      await guestWishlist.save();
  
      return res.json({ message: 'Item removed from guest wishlist' });
    } catch (error) {
      console.error('Error removing wishlist item:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }







export {addGuestWishlistItem,removeGuestWishlistItem,addToWishlist,removeFromWishlist,getMyWishlist}