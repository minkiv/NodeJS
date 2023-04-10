// const http = require("http");
// import http from "http";

// const products = [
//   { id: 1, name: "Product A" },
//   { id: 2, name: "Product B" },
// ];

// const server = http.createServer(function (req, res) {
//   console.log("Recieved request", req.url);
//
//   if (req.url == "/") {
//     res.setHeader("Content-Type", "text/html");
//     res.end(`<form action`);
//   }
//   if (req.url == "/api/products") {
//     res.setHeader("Content-Type", "application/json");
//     res.end(JSON.stringify(products));
//   }
// });
// server.listen(8080, function () {
//   console.log("Server is running on port 8080");
// });
// npm init -y
// npm install nodemon -g
// truy cập package.json
// "scripts": {"start": "nodemon app.js"},

//npm start

//Express

// import express from "express";
// import productRouter from "./routers/product.js";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(express.json());

// app.use("/api", productRouter);
// app.listen(process.env.PORT, function () {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

// import express from "express";
// import productRouter from "./routers/product.js";
// import authRouter from "./routers/auth.js";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// // config
// dotenv.config();
// const app = express();

// // middleware
// app.use(express.json());

// //router
// app.use("/api", productRouter);
// app.use("/api", authRouter);

// // connect to db
// if (mongoose.connect("mongodb://localhost:27017/we17309"))
//   console.log("database connected!");

// export const viteNodeApp = app;

import express from "express";
import productRouter from "./routers/product.js";
import categoryRouter from "./routers/category.js";
import authRouter from "./routers/auth.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", authRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/web17309")
  .then(() => console.log("connect"))
  .catch((err) => console.log(err));
app.listen(8080, () => {
  console.log("server is running on port 8080");
});
// export const viteNodeApp = app;
