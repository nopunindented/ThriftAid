const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const Postings = new Schema({
    thriftstore: {
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
    numberofphone: {
      type: String,
      required: true
    },
    pickuptime :{
        type: Number,
        min: 0,
        max: 2400,
    },
    pickupcomments: {
      type: String,
      required: false
    }
  });
  module.exports = Posting = mongoose.model("postings", Postings);