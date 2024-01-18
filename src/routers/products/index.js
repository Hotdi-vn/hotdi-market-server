const productHandler = require('../../handlers/products');
const productSettings = require('../../settings/product');
const RouterMaster = require('../../templates/routers/master');
class ProductRouter extends RouterMaster {
    constructor(settings, handler) {
        super(settings, handler)
    }
}

const productRouter = new ProductRouter(productSettings, productHandler);

productRouter.registerGetAll();
productRouter.registerCreateOne();
productRouter.registerGetOne();
productRouter.registerUpdateOne();
productRouter.registerDeleteOne();

module.exports = productRouter.routes;