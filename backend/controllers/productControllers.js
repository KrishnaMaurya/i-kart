import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";

//Get all products -> /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res) => {
  const resPerPage = 2;
  const apiFilter = new APIFilters(Product, req.query).search().filters();
  let products = await apiFilter.query;
  const filteredProductCount = products.length;

  apiFilter.pagination(resPerPage);
  products = await apiFilter.query.clone();

  res.status(200).json({
    resPerPage,
    filteredProductCount,
    products,
  });
});

//Create products -> /api/v1/admin/products
export const newProduct = catchAsyncErrors(async (req, res) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);
  res.status(200).json({
    product,
  });
});

//Get one product -> /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));
  res.status(200).json({
    product,
  });
});

//Update product -> /api/v1/products/:id
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await Product.findById(req?.params?.id);
    if (!product) return next(new ErrorHandler("Product not found", 404));
    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
      new: true,
    });
    res.status(200).json({
      product,
    });
  } catch {
    console.log("Server Error");
    res.status(500).json({
      message: "Server Error",
    });
  }
});

//Delete product -> /api/v1/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await Product.findById(req?.params?.id);
    if (!product) return next(new ErrorHandler("Product not found", 404));
    await product.deleteOne();
    res.status(200).json({
      message: "Product Deleted",
    });
  } catch {
    console.log("Server Error");
    res.status(500).json({
      message: "Server Error",
    });
  }
});
