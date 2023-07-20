import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    // Extract query parameters from the request
    const Cg = req.query.Cg;            // Category filter
    const filter = req.query.filter;    // Sorting filter
    const from = req.query.from;        // Minimum price range
    const to = req.query.to;            // Maximum price range
    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: 'i',
              },
          }
        : {};                          // Keyword search for product name

    console.log(req.query.keyword);

    if (Cg) {
        // Fetch products filtered by category
        const products = await Product.find({ category: Cg });
        res.json(products);
    } else if (filter) {
        // Sort and fetch products based on different filter options
        switch (filter) {
            case 'Rating':
                const productsByRating = await Product.find({}).sort('-rating').exec();
                res.json(productsByRating);
                break;
            case 'date':
                const productsByDate = await Product.find({}).sort('createdAt').exec();
                res.json(productsByDate);
                break;
            case 'highprice':
                const productsByHighPrice = await Product.find({}).sort('price');
                res.json(productsByHighPrice);
                break;
            case 'lowprice':
                const productsByLowPrice = await Product.find({}).sort('-price').exec();
                res.json(productsByLowPrice);
                break;
            default:
                break;
        }
    } else if (from && to) {
        // Fetch products within a price range
        const productsByPrice = await Product.find({ price: { $lte: to, $gte: from } });
        res.json(productsByPrice);
    } else {
        // Fetch products based on keyword (if provided) or all products
        const products = await Product.find({ ...keyword });
        res.json(products);
    }
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    // Fetch a single product by its ID
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        // Return 404 if product is not found
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc Delete a product
// @route GET /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    // Delete a product by its ID
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: 'Product Removed' });
    } else {
        // Return 404 if product is not found
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    // Create a new product with default values
    const product = new Product({
        name: 'Sample name',
        price: 0,
        description: 'sample description',
        user: req.user._id,
        brand: [],
        images: [],
        category: [],
        countInStock: 0,
        numReviews: 0,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    // Update an existing product by its ID
    const { name, price, description, category, brand, Images, countInStock } = req.body;
    console.log(name, price, Images);
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.category = category;
        product.brand = brand;
        product.images = Images;
        product.countInStock = countInStock;
        const updatedProduct = await product.save();
        console.log(updatedProduct);
        res.json(updatedProduct);
    } else {
        // Return 404 if product is not found
        res.status(404);
        throw new Error('Product Not found');
    }
});

// @desc Create new Review
// @route PUT /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
    // Create a new review for a product
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );
        if (alreadyReviewed) {
            // Return 404 if product is already reviewed by the user
            res.status(404);
            throw new Error('Product Already Reviewed');
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404);
        throw new Error('Product Not found');
    }
});

// Exporting the route handlers to be used in the application's routes
export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
};