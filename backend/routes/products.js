import express from "express";
import {
  getProducts,
  getProductDetails,
  newProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";
const router = express.Router();
router.route("/products").get(getProducts);
router.route("/products/:id").get(getProductDetails);
router.route("/products/:id").put(updateProduct);
router.route("/products/:id").delete(deleteProduct);
router.route("/admin/product").post(newProduct);

export default router;
