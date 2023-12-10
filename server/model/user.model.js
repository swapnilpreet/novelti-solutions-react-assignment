const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    Email: { 
    type: String,
    required: true 
   },
   FirstName: { 
    type: String, 
    required: true 
   },
   LastName: { 
    type: String, 
    required: true 
   },
   CountryCode: { 
    type: String, 
    required: true 
   },
   Mobile: {
    type: String,
    required: true,
  },
  Adress1:{
    type: String,
    required: true,
  },
  Adress2: {
    type: String,
  },
  State: {
    type: Array,
    required: true,
  },
  Country:{
    type: Array,
    required: true,
  },
  ZipCode: {
    type: String,
    required: true,
  },
});
const userModel = mongoose.model("user", userSchema);
module.exports = { userModel };