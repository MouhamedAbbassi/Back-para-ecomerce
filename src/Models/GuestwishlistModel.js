import mongoose from "mongoose";


const GuestWishlistSchema = new mongoose.Schema(
  {
    guestId: {
      type: String, 
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const GuestWishlist = mongoose.model('GuestWishlist', GuestWishlistSchema);


export default GuestWishlist;