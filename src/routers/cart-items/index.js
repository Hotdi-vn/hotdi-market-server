const cartItemHandler = require('../../handlers/cart-items');
const cartItemSettings = require('../../settings/cart-item');
const RouterMaster = require('../../templates/routers/master/index.js');
class CartItemRouter extends RouterMaster {
    constructor(settings, handler) {
        super(settings, handler)
    }
}

const cartItemRouter = new CartItemRouter(cartItemSettings, cartItemHandler);

cartItemRouter.registerGetMyAll(true);
cartItemRouter.registerGetAll();
cartItemRouter.registerCreateOne();
cartItemRouter.registerGetOne();
cartItemRouter.registerUpdateOne();
cartItemRouter.registerDeleteOne();

module.exports = cartItemRouter.routes;