import Product from "../model/productModel.js";


// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {

    const product = new Product(req.body);

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};



// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {

    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};



// GET SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {
  try {

    const id = req.params.id;

    const productExist = await Product.findById(id);

    if (!productExist) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(productExist);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};



// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {

    const id = req.params.id;

    const productExist = await Product.findById(id);

    if (!productExist) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedProduct);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};




// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {

    const id = req.params.id;

    const productExist = await Product.findById(id);

    if (!productExist) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      message: "Product deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};