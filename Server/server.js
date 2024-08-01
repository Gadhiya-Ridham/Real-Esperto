const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const Url = "mongodb://localhost:27017/realEsperto";
const PORT = 4040;

const {
  Signup,
  Login,
  Update,
  AddProperty,
  AddImages,
  AddPayment,
  GetPropertyDetails,
  GetImages,
  GetData,
  UpdatePassword,
  DeleteDataFromPropertyImages,
  GetUserData,
  DeletePropertyDetailsByAdmin,
  GetPropertyDetailsByAdmin,
  GetPaymentData,
} = require("./User_Authentication/AuthController/AuthController");

const {
  userVerification,
} = require("./User_Authentication/AuthMiddleware/AuthMiddleware");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

mongoose
  .connect(Url)
  .catch((err) => console.error("MongoDB connection error:", err.message));

app.use(cookieParser());

app.post("/signup", Signup);
app.post("/login", Login);
app.get("/getImages", GetImages);
app.get("/getData", GetData);
app.post("/update", Update);
app.post("/addProperties", AddProperty);
app.post("/addImages", AddImages);
app.post("/addPayment", AddPayment);
app.post("/", userVerification);
app.put("/updatePassword", UpdatePassword);
app.delete("/deleteDataFromPropertyImages", DeleteDataFromPropertyImages);
app.get("/getPropertyDetails", GetPropertyDetails);
app.get("/getUserData", GetUserData);
app.get("/getPaymentData", GetPaymentData);
app.delete("/deletePropretyDetailsByAdmin/:id", DeletePropertyDetailsByAdmin);
app.get("/GetPropretyDetailsByAdmin/:id", GetPropertyDetailsByAdmin);

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
