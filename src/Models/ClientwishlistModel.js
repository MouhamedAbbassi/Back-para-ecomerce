
import mongoose from "mongoose";


const ClientWishlistSchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema', 
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
  
  const ClientWishlist = mongoose.model('ClientWishlist', ClientWishlistSchema);
  


export default ClientWishlist;