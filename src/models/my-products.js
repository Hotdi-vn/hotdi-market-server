const mongoose = require('mongoose');
const myProductSettings = require('../settings/my-products');

const schema = new mongoose.Schema(myProductSettings.getMongooseSchema());
const model = mongoose.model('product', schema);

module.exports = model;