const mongoose = require('mongoose');
const sellerSettings = require('../settings/seller');

const schema = new mongoose.Schema(sellerSettings.getMongooseSchema());
const model = mongoose.model('seller', schema);

module.exports = model;