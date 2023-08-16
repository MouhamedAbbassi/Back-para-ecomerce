import Product from "../models/productModel.js";
import ProductFournisseur from "../Models/ProductFournisseur.js";
import userSchema from "../Models/User.js"
  
 ///////////////// Create a new product//////////////////////
async function createnewproduct(name, rating, about, freeShipping, discount, isOffer, fastDelivery, isInStock, price, description, images, category, numReviews, UserId) {
    try {
        const userData = await userSchema.findById(UserId);
        if (!userData) {throw new Error("User not found");}

        const commonProductData = { name, price, description, images,  category, numReviews,
            rating, about,  freeShipping, discount, isOffer, fastDelivery, isInStock,};

        let createdProduct;
        if (userData.role === "fournisseur") {
            const productFournisseur = new ProductFournisseur(commonProductData);
            createdProduct = await productFournisseur.save();
        } else if (userData.role === "admin") {
            const product = new Product(commonProductData);
            createdProduct = await product.save();
        } else {
            throw new Error("Invalid user role");
        }

        return createdProduct;
    } catch (error) {
        console.error("Error creating product:", error);
        throw new Error("Something went wrong");
    }
}

//////////////////// Update product////////////////////////
const updateProducts = async (productId, updatedData) => {
  try {
      const product = await Product.findById(productId);
      const productF = await ProductFournisseur.findById(productId);

      if (!product && !productF) {
          throw new Error("Product not found");
      }

      const targetProduct = product ? product : productF;

      const fieldsToUpdate = ["name", "price", "description", "category", "images",
          "isInStock", "fastDelivery", "freeShipping", "isOffer",];

      fieldsToUpdate.forEach(field => { targetProduct[field] = updatedData[field] || targetProduct[field];});

      const updatedProduct = await targetProduct.save();
      return updatedProduct;
  } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
  }
};

/////////////////////// delete product//////////////////////

const deleteProducts = async (productId) => {
  try {
    const product = await Product.findById(productId);
    const productF = await ProductFournisseur.findById(productId);
    if (!product&& !productF) { throw new Error("Product not found");}
    else if(product){await product.deleteOne(); }
    else if(productF){await productF.deleteOne(); }
    return { message: "Product Removed" };
  } catch (error) {throw new Error(`Error deleting product: ${error.message}`); }
};

  export { deleteProducts,createnewproduct,updateProducts };