import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
    }, ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "userSchema" },
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);

export default Cart ;
