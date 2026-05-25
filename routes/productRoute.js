import express from "express";

import {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const route = express.Router();


// CREATE PRODUCT
route.post("/", createProduct);


// GET ALL PRODUCTS
route.get("/", getProducts);


// GET SINGLE PRODUCT
route.get("/:id", getSingleProduct);


// UPDATE PRODUCT
route.put("/:id", updateProduct);


// DELETE PRODUCT
route.delete("/:id", deleteProduct);

export default route;