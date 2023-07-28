import Product from '../models/productModel.js';
 
 
 // Create a new product

async function  createnewproduct(id,name,price, description,title,images,category,numReviews) {
    
        const product = new Product({
                id:id,
            name: name,
            price: price,
            description: description,
            title: title,
            images: images,
            category: category,
            numReviews:numReviews ,
          });
     
          const createdProduct = await product.save();
          return createdProduct;
  }

               //  Update product


const updateProducts = async (productId, updatedData) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    // Update the product properties with the provided data
    
    product.name = updatedData.name || product.name;
    product.price = updatedData.price || product.price;
    product.description = updatedData.description || product.description;
    product.category = updatedData.category || product.category;
    product.title = updatedData.title || product.title;
    product.images = updatedData.images || product.images;

    const updatedProduct = await product.save();
    return updatedProduct;
  } catch (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }
};

// delate product

const deleteProducts = async (productId) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    await product.deleteOne();
    return { message: 'Product Removed' };
  } catch (error) {
    throw new Error(`Error deleting product: ${error.message}`);
  }
};

  export { deleteProducts,createnewproduct,updateProducts };