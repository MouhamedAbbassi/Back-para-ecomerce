/* eslint-disable quotes */
import express from 'express';
// import * as productController from "../Controllers/ProductControler"
 
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, updateProduct } from '../Controllers/ProductController.js';
 
import { upload } from '../Controllers/ProductController.js'; 
const router = express.Router()
 

// Route to get all products and create a new product
router.route('/products').get(getProducts).post(createProduct);

// Route to create a product review
router.route('/products/:id/reviews').post(createProductReview);

// // Route to get a specific product, update, or delete it
router.route('/products/:id').get(getProductById).put(updateProduct).delete(deleteProduct);

router.post('/products/create', upload, createProduct);

export default router