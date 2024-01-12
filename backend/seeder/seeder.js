import mongoose from "mongoose";
import products from "./data.js";
import Product from "../models/product.js";

const seeder = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ikart");
    console.log("Connected");
    await Product.deleteMany();
    console.log("All products deleted");
    await Product.insertMany(products);
    console.log("Inserted all products");
    process.exit();
  } catch {
    console.log("Error");
    process.exit();
  }
};
seeder();
