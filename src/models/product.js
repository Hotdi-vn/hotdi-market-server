const mongoose = require('mongoose');
const productSettings = require('../settings/product');
const fileModel = require('./file');

const schema = new mongoose.Schema(productSettings.getMongooseSchema());

// soft delete
schema.pre('find', function () {
    this.where({ deleted: { $ne: true } });
});
schema.pre('findOne', function () {
    this.where({ deleted: { $ne: true } });
});
schema.pre('findById', function () {
    this.where({ deleted: { $ne: true } });
});

const model = mongoose.model('product', schema);

module.exports = model;