const mongoose = require('mongoose');
const postSettings = require('../settings/post');

const schema = new mongoose.Schema(postSettings.getMongooseSchema());
const model = mongoose.model('market_post', schema);

module.exports = model;