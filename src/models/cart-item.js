const mongoose = require('mongoose');
const cartItemSettings = require('../settings/cart-item');

const schema = new mongoose.Schema(cartItemSettings.getMongooseSchema());
const model = mongoose.model('cart_item', schema);

module.exports = model;