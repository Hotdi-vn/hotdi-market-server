const sellerService = require('../../services/sellers');
const productService = require('../../services/products');
const HandlerMaster = require('../../templates/handlers/master');

class SellerHandler extends HandlerMaster {
    constructor(service) {
        super(service);
    }
    registerGetProductPublished() {
        const GetProductPublishedHandler = require('./get-product-published');
        const getProductPublishedHandler = new GetProductPublishedHandler(productService);
        this.register('getProductPublished', getProductPublishedHandler.handler);
    }
    registerCreateMyOne() {
        const CreateMyOneHandler = require('./me/create-one');
        const createMyOneHandler = new CreateMyOneHandler(this.service);
        this.register('createMyOne', createMyOneHandler.handler);
    }
    registerUpdateMyOne() {
        const UpdateMyOneHandler = require('./me/update-one');
        const updateMyOneHandler = new UpdateMyOneHandler(this.service);
        this.register('updateMyOne', updateMyOneHandler.handler);
    }
}

const sellerHandler = new SellerHandler(sellerService);

sellerHandler.registerGetAll();
sellerHandler.registerCreateOne();
sellerHandler.registerGetOne();
sellerHandler.registerUpdateOne();
sellerHandler.registerDeleteOne();
sellerHandler.registerGetProductPublished();
sellerHandler.registerCreateMyOne();
sellerHandler.registerUpdateMyOne();

module.exports = sellerHandler.getHandlers();