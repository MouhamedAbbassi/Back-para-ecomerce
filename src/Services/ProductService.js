import Product from "../models/productModel.js";
import ProductF from "../Models/ProductFournisseur.js";
import userSchema from "../Models/User.js"
 
 // Create a new product

async function  createnewproduct(name,rating,about,freeShipping,discount,isOffer,fastDelivery,isInStock,price, description,images,category,numReviews,UserId) {
  console.log("service:" ,UserId);
        const product = new Product({
            name: name,
            price: price,
            description: description,
            images: images,
            category: category,
            numReviews:numReviews ,
            rating:rating,
            about:about,
            freeShipping:freeShipping,
            discount:discount,
            isOffer:isOffer,
            fastDelivery:fastDelivery,
            isInStock:isInStock,
          });
     
         // const createdProduct = await product.save();
          //return createdProduct;
         user = await userSchema.findById(UserId)
         console.log('service:',user);
         if (user){
          console.log("service:" ,user);
          if (user.role === "fournisseur"){
          const createdProductF = await ProductF.save();
          return createdProductF;
         }
         else if (user.role === "admin"){
          const createdProduct = await product.save();
          return createdProduct;
         }
        }
        return  "somthing went wrong";
  }

               //  Update product


const updateProducts = async (productId, updatedData) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    // Update the product properties with the provided data
    
    product.name = updatedData.name || product.name;
    product.price = updatedData.price || product.price;
    product.description = updatedData.description || product.description;
    product.category = updatedData.category || product.category;
    
    product.images = updatedData.images || product.images;

    const updatedProduct = await product.save();
    return updatedProduct;
  } catch (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }
};

// delete product

const deleteProducts = async (productId) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    await product.deleteOne();
    return { message: "Product Removed" };
  } catch (error) {
    throw new Error(`Error deleting product: ${error.message}`);
  }
};

  export { deleteProducts,createnewproduct,updateProducts };