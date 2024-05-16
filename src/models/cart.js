const mongoose = require('mongoose');
const cartSettings = require('../settings/cart');

const schema = new mongoose.Schema(cartSettings.getMongooseSchema());
const model = mongoose.model('cart', schema);

module.exports = model;