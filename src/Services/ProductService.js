import Product from '../models/productModel.js';
 
 
 // Create a new product

async function  createnewproduct(name, price, description,brand,images,category,countInStock,numReviews,req,res) {
    
        const product = new Product({
            name: name,
            price: price,
            description: description,
            brand: brand,
            images: images,
            category: category,
            countInStock: countInStock,
            numReviews:numReviews ,
          });
     
          const createdProduct = await product.save();
          return createdProduct;
  }


  export {  createnewproduct };