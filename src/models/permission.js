const mongoose = require('mongoose');
const permissionSettings = require('../settings/permission');

const schema = new mongoose.Schema(permissionSettings.getMongooseSchema());
const model = mongoose.model('market_permission', schema);

module.exports = model;