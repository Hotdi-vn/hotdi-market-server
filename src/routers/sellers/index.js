const sellerHandler = require('../../handlers/sellers');
const sellerSettings = require('../../settings/seller');
const RouterMaster = require('../../templates/routers/master');
const GetProductPublishedRouter = require('./get-product-published');
class SellerRouter extends RouterMaster {
    constructor(settings, handler) {
        super(settings, handler)
    }
}

const sellerRouter = new SellerRouter(sellerSettings, sellerHandler);

sellerRouter.registerGetAll();
sellerRouter.registerCreateOne();
sellerRouter.registerGetOne();
sellerRouter.registerUpdateOne();
sellerRouter.registerDeleteOne();


// custom routers
const getProductPublishedRouter = new GetProductPublishedRouter(sellerSettings, sellerHandler);
sellerRouter.register(getProductPublishedRouter.routes);

module.exports = sellerRouter.routes;