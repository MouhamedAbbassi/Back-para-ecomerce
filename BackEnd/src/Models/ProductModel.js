import mongoose from 'mongoose';

// schema represent  user's review for product
const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },      
    rating: { type: Number, required: true },   
    comment: { type: String, required: true },  
    user: {
        type: mongoose.Schema.Types.ObjectId,    // Reference to the User model
        required: true,
        ref: 'userSchema'                             // Relation between the review and the user
    },
}, 
{timestamps: true   });                          // Automatically add createdAt and updatedAt fields
   
//  schema represent the product 
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true                          
    },
    images: [{
        type: String,                         
    }],
    description: {
        type: String,
        required: true                          
    },
    category: [{
        type: String,
        required: true                         
    }],
    reviews: [reviewSchema],                    // Array of reviews embedded in the product
    rating: {
        type: Number,
        required: true,
        default: 0                              // Product rating with default value of 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0                              
    },
    price: {
        type: Number,
        required: true,
        default: 0                              
    },
   
}, {
    timestamps: true                            
});

const Product = mongoose.model('Product', productSchema);

export default Product;