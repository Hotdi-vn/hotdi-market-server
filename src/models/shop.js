const mongoose = require('mongoose');
const shopSettings = require('../settings/shop');
const fileModel = require('./file');
const schema = new mongoose.Schema(shopSettings.getMongooseSchema());
const model = mongoose.model('shop', schema);

module.exports = model;
