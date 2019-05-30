// app.js
const cors = require('cors');
const express = require("express");
var path = require('path')
const bodyParser = require("body-parser");
var config = require("./config/db");
const loginController = require("./controllers/LoginController");
const registerController = require("./controllers/RegisterController");
const app = express();
const port = process.env.PORT || 3301;
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const UploadPropertyController = require("./controllers/UploadPropertyController")
const ApprovePropertyController = require("./controllers/ApprovePropertyController")
const OrderController = require("./controllers/OrderController")
const PictureConstroller = require("./controllers/PictureController")

app
  .route("/api/Accounts/SignIn")
  .post(loginController.handleSignInAttempt)

app
  .route("/api/Accounts/Register")
  .post(registerController.handleRegister)
app
  .route("/api/RentINN/GetSpecificUser/:userId")
  .get(loginController.GetSpecificUser)
app
  .route("/api/Accounts/GetAllAccounts")
  .get(loginController.getAllAccounts)
app
    .route("/api/Accounts/DeleteAllAccounts")
    .delete(loginController.deleteAllAccounts)
app
  .route("/api/RentINN/UploadProperty")
  .post(UploadPropertyController.UploadProperty)
app
  .route("/api/RentINN/updadeInformation/:pizzaId")
  .post(UploadPropertyController.updadeInformation)
app
  .route("/api/RentINN/GetAllUploadedProperties")
  .get(UploadPropertyController.GetAllUploadedProperties)
app
  .route("/api/RentINN/GetSpecificUploadedProperty/:propertyId")
  .get(UploadPropertyController.GetSpecificUploadedProperty)

app
  .route("/api/RentINN/DeleteUploadedProperty/:propertyId")
  .post(UploadPropertyController.DeleteUploadedProperty)

app
  .route("/api/RentINN/ApproveProperty")
  .post(ApprovePropertyController.ApproveProperty)
app
  .route("/api/RentINN/GetAllApprovedProperties")
  .get(ApprovePropertyController.GetAllApprovedProperties)
app
  .route("/api/RentINN/GetSpecificApprovedProperty")
  .get(ApprovePropertyController.GetSpecificApprovedProperty)

app
  .route("/api/RentINN/DeleteApprovedProperty")
  .delete(ApprovePropertyController.DeleteApprovedProperty)

app
  .route("/api/RentINN/MakeOrder")
  .post(OrderController.MakeOrder)
app
  .route("/api/RentINN/GetAllOrders")
  .get(OrderController.GetAllOrders)
app
  .route("/api/RentINN/GetSpecificOrder")
  .get(OrderController.GetSpecificOrder)

app
  .route("/api/RentINN/DeleteOrder")
  .delete(OrderController.DeleteOrder)
app
  .route("/api/RentINN/DeleteAllOrders")
  .delete(OrderController.DeleteAllOrders)
app
  .route("/api/RentINN/GetPropertyPictures/:PropertyId")
  .get(PictureConstroller.GetPropertyImages)
app
  .route("/api/RentINN/AddPicture")
  .post(PictureConstroller.AddImage)

app
  .route("/api/RentINN/GetAllPictures")
  .get(PictureConstroller.GetAllImages)
app 
  .route("/api/RentINN/DeleteAllUploadedProperties")
  .delete(UploadPropertyController.DeleteAllUploadedProperties)
  
app.listen(port, () => {
  console.log(`Server running at https://rent-inn-reactjs.herokuapp.com/`);
});