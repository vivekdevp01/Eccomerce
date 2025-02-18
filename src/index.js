const express = require("express");
// const { Product, Category, Cart } = require("./models");
const { ServerConfig } = require("./config");
const ErrorHandler = require("./utils/errorHandler");
const responseTime = require("response-time");
const cookieParser = require("cookie-parser");
const apiRoutes = require("./routes");

const app = express();
app.use(responseTime());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", apiRoutes);

app.use(ErrorHandler);
app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
  // const cart = await Cart.findByPk(1);
  // const products = await cart.getProducts();
  // console.log(products.length);
});
