const mongoose = require('mongoose');
const bannerSetting = require('../settings/banner');

const schema = new mongoose.Schema(bannerSetting.getMongooseSchema());
const model = mongoose.model('banner', schema);

module.exports = model;