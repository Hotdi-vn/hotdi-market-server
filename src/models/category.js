const mongoose = require('mongoose');
const categorySettings = require('../settings/category');

const schema = new mongoose.Schema(categorySettings.getMongooseSchema());
const model = mongoose.model('category', schema);

module.exports = model;