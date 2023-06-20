const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  usertype: {
    type: String,
    required: true
  },
  thriftstorename: {
    type: String,
  },
  website: {
    type: String,
    required: false,
    unique: false
  }

});
module.exports = User = mongoose.model("users", UserSchema);