const sellerHandler = require('../../handlers/sellers');
const sellerSettings = require('../../settings/seller');
const RouterMaster = require('../../templates/routers/master');
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

module.exports = sellerRouter.routes;