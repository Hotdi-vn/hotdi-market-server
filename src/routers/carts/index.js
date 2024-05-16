const cartHandler = require('../../handlers/carts');
const cartSettings = require('../../settings/cart');
const RouterMaster = require('../../templates/routers/master');
class CartRouter extends RouterMaster {
    constructor(settings, handler) {
        super(settings, handler)
    }
}

const cartRouter = new CartRouter(cartSettings, cartHandler);

cartRouter.registerGetAll();
cartRouter.registerCreateOne();
cartRouter.registerGetOne();
cartRouter.registerUpdateOne();
cartRouter.registerDeleteOne();

module.exports = cartRouter.routes;