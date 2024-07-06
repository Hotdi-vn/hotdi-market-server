const sellerHandler = require('../../handlers/sellers');
const sellerSettings = require('../../settings/seller');
const RouterMaster = require('../../templates/routers/master');
const GetProductPublishedRouter = require('./get-product-published');
class SellerRouter extends RouterMaster {
    constructor(settings, handler) {
        super(settings, handler)
    }
    registerCreateMyOne() {
        const CreateMyOneRouter = require('./me/create-one');
        const createMyOneRouter = new CreateMyOneRouter(this.settings, this.handler);
        this.register(createMyOneRouter.routes);
    }
    registerUpdateMyOne() {
        const UpdateMyOneRouter = require('./me/update-one');
        const updateMyOneRouter = new UpdateMyOneRouter(this.settings, this.handler);
        this.register(updateMyOneRouter.routes);
    }
}

const sellerRouter = new SellerRouter(sellerSettings, sellerHandler);

sellerRouter.registerGetAll();
sellerRouter.registerCreateOne();
sellerRouter.registerGetOne();
sellerRouter.registerUpdateOne();
sellerRouter.registerDeleteOne();
sellerRouter.registerCreateMyOne();
sellerRouter.registerUpdateMyOne();

// custom routers
const getProductPublishedRouter = new GetProductPublishedRouter(sellerSettings, sellerHandler);
sellerRouter.register(getProductPublishedRouter.routes);

module.exports = sellerRouter.routes;