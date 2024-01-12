import express from "express";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/errors.js";
const app = express();

//Handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err}`);
  console.log(`Shutting down due to uncaught exception`);
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

//DB Connect
connectDatabase();

app.use(express.json());

//import routes
import productRoutes from "./routes/products.js";
import { connectDatabase } from "./config/dbConnect.js";

app.use("/api/v1", productRoutes);

//Using error Middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server satrted at port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

//Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting down server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
