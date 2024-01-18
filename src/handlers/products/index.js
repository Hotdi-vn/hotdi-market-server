const productService = require('../../services/products');
const HandlerMaster = require('../../templates/handlers/master');
class ProductHandler extends HandlerMaster {
    constructor(service) {
        super(service);
    }
}

const productHandler = new ProductHandler(productService);

productHandler.registerGetAll();
productHandler.registerCreateOne();
productHandler.registerGetOne();
productHandler.registerUpdateOne();
productHandler.registerDeleteOne();

module.exports = productHandler.getHandlers();