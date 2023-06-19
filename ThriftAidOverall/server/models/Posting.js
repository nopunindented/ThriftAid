const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const Postings = new Schema({
    userId:  {
      type: String,
       required: true
    },
    address: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    timeofposting: {
      type: Date,
      default: Date.now
    },
    city: {
      type: String,
      required: true
    },
    pickupdate: {
        type: String,
        required: true
      },
    pickuptime :{
        type: Number,
        required: true,
        min: 0,
        max: 2400,
    }
  });
  module.exports = Posting = mongoose.model("users", Postings);