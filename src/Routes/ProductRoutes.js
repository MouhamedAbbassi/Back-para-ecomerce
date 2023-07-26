import express from 'express'
const router = express.Router()
import {getProducts, getProductById, deleteProduct,createProduct,updateProduct, createproductreview} from '../Controllers/ProductControler'


//router.route('/').get(getProducts).post(createProduct)
//router.route('/:id/reviews').post(createproductreview)
//router.route('/:id').get(getProductById).delete(deleteProduct).put(updateProduct)

//router.route('/api/products').get(getProducts).post(createProduct)

//router.route("/products").post(createProduct);

    //router.route('/').get(getProducts).post(createProduct)
    // Route to get all products and create a new product
router.route('/products').get(getProducts).post(createProduct);

// Route to create a product review
router.route('/products/:id/reviews').post(createproductreview);

// Route to get a specific product, update, or delete it
router.route('/products/:id').get(getProductById).put(updateProduct).delete(deleteProduct);



export default router