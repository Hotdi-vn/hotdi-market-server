const ServiceMaster = require('../../../templates/services/master');
const myProductModel = require('../../../models/product');
const myProductSettings = require('../../../settings/my-products');
class ProductService extends ServiceMaster {
    constructor(model, settings) {
        super(model, settings);
    }
}

const productService = new ProductService(myProductModel, myProductSettings);

module.exports = productService;