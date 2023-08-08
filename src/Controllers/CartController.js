import asyncHandler from "express-async-handler";
import * as cartService from "../Services/cartService.js";

const fetchAllCartItems = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    try {
        const cartItems = await cartService.getAllCartItems(userId);
        res.json({
            success: true,
            items: cartItems,
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
});

const addToCart = asyncHandler(async (req, res) => {
    const { userId, productId } = req.params;
    try {
        const cartItems = await cartService.addItemToCart(userId, productId);
        res.json({
            success: true,
            items: cartItems,
            message: "Product added to cart",
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
});

const removeItem = asyncHandler(async (req, res) => {
    const { userId, productId } = req.params;
    try {
        const cartItems = await cartService.removeItemFromCart(userId, productId);
        res.status(200).json({
            success: true,
            items: cartItems,
            message: "Product removed from cart",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

const changeQuantity = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    try {
        const cartItems = await cartService.changeCartItemQuantity(userId, productId, quantity);
        res.json({
            success: true,
            items: cartItems,
            message: "Product quantity changed",
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
});

const removeAllItems = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    try {
        const cartItems = await cartService.removeAllItemsFromCart(userId);
        res.status(200).json({
            success: true,
            items: cartItems,
            message: "All items removed from cart",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});


export {
    fetchAllCartItems,
    addToCart,
    removeItem,
    changeQuantity,
    removeAllItems,
};
