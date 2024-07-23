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
    registerSubmitMyOne() {
        const SubmitRouter = require('./me/submit');
        const submitRouter = new SubmitRouter(this.settings, this.handler);
        this.register(submitRouter.routes);
    }
    registerGetMyShop() {
        const GetMyShopRouter = require('./me/get-one');
        const getMyShopRouter = new GetMyShopRouter(this.settings, this.handler);
        this.register(getMyShopRouter.routes);
    }
}

const shopRouter = new ShopRouter(shopSettings, shopHandler);

shopRouter.registerGetMyShop();
shopRouter.registerGetAll();
shopRouter.registerCreateOne(true);
shopRouter.registerGetOne();
shopRouter.registerUpdateOne(true);
shopRouter.registerDeleteOne(true);
shopRouter.registerCreateMyOne();
shopRouter.registerUpdateMyOne();
shopRouter.registerSubmitMyOne();

// custom routers
const getProductPublishedRouter = new GetProductPublishedRouter(shopSettings, shopHandler);
shopRouter.register(getProductPublishedRouter.routes);

module.exports = shopRouter.routes;