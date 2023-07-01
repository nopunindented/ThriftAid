const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const Postings = new Schema({
    thriftstore: {
      type: String,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    timeofposting: {
      type: Date,
      default: Date.now
    },
    city: {
      type: String,
    },
    pickupdate: {
        type: String,
      },
    numberofphone: {
      type: String,
    },
    pickuptime :{
        type: Number,
        min: 0,
        max: 2400,
    }
  });
  module.exports = Posting = mongoose.model("postings", Postings);