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
}

const sellerHandler = new SellerHandler(sellerService);

sellerHandler.registerGetAll();
sellerHandler.registerCreateOne();
sellerHandler.registerGetOne();
sellerHandler.registerUpdateOne();
sellerHandler.registerDeleteOne();
sellerHandler.registerGetProductPublished();

module.exports = sellerHandler.getHandlers();