import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
 import {createnewproduct,deleteProducts,updateProducts } from "../Services/ProductService.js";
import multer from "multer";
import path from "path";

///////////////////////////Fetch all products/////////////////////////////
const getProducts = asyncHandler(async (req, res) => {
    // Extract query parameters from the request
    const Cg = req.query.Cg;            // Category filter
    const filter = req.query.filter;    // Sorting filter
    const from = req.query.from;        // Minimum price range
    const to = req.query.to;            // Maximum price range
    const keyword = req.query.keyword
        ? { name: { $regex: req.query.keyword, $options: "i", },} : {};   // Keyword search for product name

    console.log(req.query.keyword);

    if (Cg) {
        // Fetch products filtered by category
        const products = await Product.find({ category: Cg });
        res.json(products);
    } else if (filter) {
        // Sort and fetch products based on different filter options
        switch (filter) {
            case "Rating":{
                const productsByRating = await Product.find({}).sort("-rating").exec();
                res.json(productsByRating);
                break;
            }
            case "date":{
                const productsByDate = await Product.find({}).sort("createdAt").exec();
                res.json(productsByDate);
                break;
            }
            case "highprice":{
                const productsByHighPrice = await Product.find({}).sort("price");
                res.json(productsByHighPrice);
                break;
            }
            case "lowprice":{
                const productsByLowPrice = await Product.find({}).sort("-price").exec();
                res.json(productsByLowPrice);
                break;
            }
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

            // Fetch a single product by its ID
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

// Delete a product by ID
const deleteProduct = asyncHandler(async (req, res) => {
    try {
      const result = await deleteProducts(req.params.id);
      res.json(result);
    } catch (err) {
      // Handle any errors thrown by the ProductService
      res.status(500).json({ error: err.message });
    }
  });
// Multer configuration for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});
export const upload = multer({ storage: storage }).array("images",10);

////////////////////////////// Create a new product///////////////////////
const createProduct = asyncHandler(async (req, res) => {
    // Upload the product image first
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: "Image upload failed!" });
        }
        // Get the product data from the request body, including the uploaded image file name
        const {name,rating,about,freeShipping,discount,isOffer,fastDelivery,isInStock,price, description,category,numReviews } = req.body;
        const images = req.files ? req.files.map((file) => file.filename) : ["default.jpg"];
        const UserId = req.params.id ;
         try {
            // Call the createnewproduct function from ProductService and await the result
            const createdProduct = await createnewproduct(name,rating,about,freeShipping,discount,isOffer,fastDelivery,isInStock,price, description,images,category,numReviews,UserId );
            res.status(201).json({ message: "Product created successfully", product: createdProduct });
        } catch (err) {      
            res.status(500).json({ message: "Failed to create product", error: err.message });
        }
    });
});
      // Update an existing product by its ID
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, category, Images, } = req.body;
    const { id } = req.params; // ID as a URL parameter
    try {
      const updatedProduct = await updateProducts(id, {name,price,description,category,images: Images,});
  
      res.json(updatedProduct);
    } catch (err) {
      // Handle any errors thrown by the ProductService
      res.status(500).json({ error: err.message });
    }
  });

            // Create a new review for a product
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );
        if (alreadyReviewed) {
            // Return 404 if product is already reviewed by the user
            res.status(404);
            throw new Error("Product Already Reviewed");
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
        res.status(201).json({ message: "Review added" });
    } else {
        res.status(404);
        throw new Error("Product Not found");
    }
});


export default {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    upload
};
