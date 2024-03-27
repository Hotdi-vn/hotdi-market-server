const mongoose = require('mongoose');

// Define the schema for the post
const schema = new mongoose.Schema({
  _id: {
    type: String
  },
  url: {
    type: String
  },
  size: {
    type: Number
  },
  ownerId: {
    type: String
  },
  createdAt: {
    type: Number,
    default: Date.now
  }
});


// Create the model using the post schema

const modelName = 'file';
const model = mongoose.model(modelName, schema);


module.exports = model;

