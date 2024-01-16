import express from "express";
import {
  getProducts,
  getProductDetails,
  newProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";
import { isAuthenticatedUser, authorizedRoles } from "../middlewares/auth.js";
const router = express.Router();
router.route("/products").get(getProducts);
router.route("/products/:id").get(getProductDetails);
router
  .route("/products/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct);
router
  .route("/products/:id")
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);
router
  .route("/admin/product")
  .post(isAuthenticatedUser, authorizedRoles("admin"), newProduct);

export default router;
