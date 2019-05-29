const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LoginAccount = new Schema({
  name: {
    type: String
  },
  email: {
    type : String
  },
  password: {
    type: String
  },
  phoneNo :{
    type : String
  }
  
});
module.exports = mongoose.model("LoginAccount", LoginAccount);
