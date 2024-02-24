const productService = require('../../services/products');
const HandlerMaster = require('../../templates/handlers/master');
class ProductHandler extends HandlerMaster {
    constructor(service) {
        super(service);
    }
    registerCreateOne() {
        const CreateOneHandler = require('./create-one');
        const createOneHandler = new CreateOneHandler(this.service);
        this.register('createOne', createOneHandler.handler);
    }
    registerUpdateOne() {
        const UpdateOneHandler = require('./update-one');
        const updateOneHandler = new UpdateOneHandler(this.service);
        this.register('updateOne', updateOneHandler.handler);
    }
}

const productHandler = new ProductHandler(productService);

productHandler.registerGetAll();
productHandler.registerCreateOne();
productHandler.registerGetOne();
productHandler.registerUpdateOne();
productHandler.registerDeleteOne();

module.exports = productHandler.getHandlers();