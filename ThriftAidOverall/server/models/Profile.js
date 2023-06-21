const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ProfileSchema = new Schema({
  establishmentname: {
    type: String,
  },
  website: {
    type: String,
    required: false,
    unique: false
  },
  phonenumber: {
    type: String,
    required: false,
    unique: false
  }

});
module.exports = Profile = mongoose.model("profiles", ProfileSchema);