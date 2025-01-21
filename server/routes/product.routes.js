import express from "express";
import {
  CreateProduct,
  DeleteProducts,
  GetAllProducts,
  GetOneProduct,
  SignIn,
  UpdateProduct,
} from "../controllers/product.controller.js";
import upload from "../middlewares/multer.js";
import { isAuth } from "../middlewares/isAuth.js";

const productRoutes = express.Router();

// Create Products
productRoutes.post("/CreateProducts", upload.single("file"), CreateProduct);

// Sign In
productRoutes.post("/signin", SignIn);
// Delete Products
productRoutes.delete("/DeleteProducts/:ProductId", DeleteProducts);

// Get All Products
productRoutes.get("/GetAllProducts/:userId", isAuth, GetAllProducts);

// Get One Products
productRoutes.get("/GetOneProducts/:id", GetOneProduct);

// Update Products
productRoutes.patch(
  "/UpdateProducts/:ProductId",
  upload.single("file"),
  UpdateProduct
);

export default productRoutes;
