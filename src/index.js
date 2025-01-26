const express = require("express");

const { ServerConfig } = require("./config");
const ErrorHandler = require("./utils/errorHandler");
const responseTime = require("response-time");
const apiRoutes = require("./routes");

const app = express();
app.use(responseTime());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.use(ErrorHandler);
app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
