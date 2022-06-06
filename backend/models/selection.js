const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let selectionSchema = new Schema({
    program: {
      type: String
    },
  }, {
    collection: 'selection'
});

module.exports = mongoose.model('selection', selectionSchema)