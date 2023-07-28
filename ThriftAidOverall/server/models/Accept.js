const mongoose = require('mongoose');

const ArrayifySchema = new mongoose.Schema({
  arrayify: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],
});

const ArrayifyModel = mongoose.model('Arrayify', ArrayifySchema);

module.exports = ArrayifyModel;
