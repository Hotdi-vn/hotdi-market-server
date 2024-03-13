const myProductsService = require('../../../services/products/me');
const HandlerMaster = require('../../../templates/handlers/master');
class MyProductsHandler extends HandlerMaster {
    constructor(service) {
        super(service);
    }
    registerGetAll() {
        const GetAllHandler = require('./get-all');
        const getAllHandler = new GetAllHandler(this.service);
        this.register('getAll', getAllHandler.handler);
    }
}

const myProductsHandler = new MyProductsHandler(myProductsService);

myProductsHandler.registerGetAll();
myProductsHandler.registerCreateOne();
myProductsHandler.registerGetOne();
myProductsHandler.registerUpdateOne();
myProductsHandler.registerDeleteOne();

module.exports = myProductsHandler.getHandlers();