const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  usertype: {
    type: String,
    required: true,
  },
  establishmentname: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  phonenumber: {
    type: String,
    default: "",
  },
});
module.exports = User = mongoose.model("users", UserSchema);