const mongoose = require('mongoose');
const productSettings = require('../settings/product');
const fileModel = require('./file');

const schema = new mongoose.Schema(productSettings.getMongooseSchema());
const model = mongoose.model('product', schema);

module.exports = model;