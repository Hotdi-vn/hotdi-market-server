const mongoose = require('mongoose');
const roleSettings = require('../settings/role');

const schema = new mongoose.Schema(roleSettings.getMongooseSchema());
const model = mongoose.model('market_role', schema);

module.exports = model;