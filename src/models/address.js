const mongoose = require('mongoose');
const addressSettings = require('../settings/address');

const schema = new mongoose.Schema(addressSettings.getMongooseSchema());
const model = mongoose.model('address', schema);

module.exports = model;