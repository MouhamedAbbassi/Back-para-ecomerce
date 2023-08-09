import User from "../Models/User.js";
import Cart from "../Models/Cart.js";


const getAllCartItems = async (userId) => {
    const user = await User.findById(userId);
    if (user.cart !== undefined) {
        const cart = await Cart.findById(user.cart).populate("items.product");
        return cart.items;
    }
    return [];
};

const addItemToCart = async (userId, productId) => {
    const user = await User.findById(userId);
    const cart = await Cart.findById(user.cart);
    if (cart) {
        const alreadyExist = cart.items.some(({ product }) => product.toString() === productId);
        if (!alreadyExist) {
            cart.items.push({
                product: productId,
                quantity: 1,
            });
            await cart.save();
        }
    } else {
        let newCart = new Cart({
            items: [{ product: productId, quantity: 1 }],
            user: userId,
        });
        newCart = await newCart.save();
        await user.updateOne({ cart: newCart._id });
    }
    const newUser = await User.findById(userId);
    const cartItems = await Cart.findById(newUser.cart).populate("items.product");
    return cartItems.items; // Should return items with full product information
};


const removeItemFromCart = async (userId, productId) => {
    const user = await User.findById(userId);
    const cart = await Cart.findById(user.cart);
    const productExist = cart.items.some(({ product }) => product.toString() === productId);
    if (productExist) {
        await cart.updateOne({ $pull: { items: { product: productId } } });
    }
    const cartItems = await Cart.findById(user.cart).populate("items.product");
    return cartItems.items;
};

// cartUtils.js

const changeCartItemQuantity = async (userId, productId, quantity) => {
    const user = await User.findById(userId);
    let cart = await Cart.findById(user.cart).populate("items.product");
    
    const productExist = cart.items.some(({ product }) => product._id.toString() === productId);
    
    if (productExist) {
        cart.items = cart.items.map((item) =>
            item.product._id.toString() === productId ? { ...item, quantity: quantity } : item
        );
        cart = await cart.save();
    }
    return cart.items;
};


const removeAllItemsFromCart = async (userId) => {
    const user = await User.findById(userId);
     console.log(user)
    if (user.cart !== undefined) {
        const cart = await Cart.findById(user.cart);
        if (cart) {
            cart.items = [];
            await cart.save();
        }
    }
    return [];
};

export {
    getAllCartItems,
    addItemToCart,
    removeItemFromCart,
    changeCartItemQuantity,
    removeAllItemsFromCart,
};
