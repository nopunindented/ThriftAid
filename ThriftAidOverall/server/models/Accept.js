const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArraySchema = new Schema({
  arrayify: {
    type: [
      {
        thriftstore: {
          type: String,
          required: true,
        },
        email: {
          type: String,
        },
        address: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        timeofposting: {
          type: Date,
          default: Date.now,
        },
        city: {
          type: String,
          required: true,
        },
        pickupdate: {
          type: String,
          required: true,
        },
        numberofphone: {
          type: String,
          required: true,
        },
        pickuptime: {
          type: String,
        },
        website: {
          type: String,
        },
        pickupcomments: {
          type: String,
          required: false,
        },
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model('arrayed', ArraySchema);
