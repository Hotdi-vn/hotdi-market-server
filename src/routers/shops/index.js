const shopHandler = require('../../handlers/shops');
const shopSettings = require('../../settings/shop');
const RouterMaster = require('../../templates/routers/master');
const GetProductPublishedRouter = require('./get-product-published');
class ShopRouter extends RouterMaster {
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

const shopRouter = new ShopRouter(shopSettings, shopHandler);

shopRouter.registerGetAll();
shopRouter.registerCreateOne(true);
shopRouter.registerGetOne();
shopRouter.registerUpdateOne(true);
shopRouter.registerDeleteOne(true);
shopRouter.registerCreateMyOne();
shopRouter.registerUpdateMyOne();

// custom routers
const getProductPublishedRouter = new GetProductPublishedRouter(shopSettings, shopHandler);
shopRouter.register(getProductPublishedRouter.routes);

module.exports = shopRouter.routes;