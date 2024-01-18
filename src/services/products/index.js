const ServiceMaster = require('../../templates/services/master');
const productModel = require('../../models/product');
const productSettings = require('../../settings/product');
class ProductService extends ServiceMaster {
    constructor(model, settings) {
        super(model, settings);
    }
}

const productService = new ProductService(productModel, productSettings);

module.exports = productService;