const cartHandler = require('../../handlers/carts');
const cartSettings = require('../../settings/cart');
const RouterMaster = require('../../templates/routers/master');
const DeleteProductRouter = require('./me/delete-product');
class CartRouter extends RouterMaster {
    constructor(settings, handler) {
        super(settings, handler)
    }
}

const cartRouter = new CartRouter(cartSettings, cartHandler);

cartRouter.registerGetMyAll(true);
cartRouter.registerGetAll();
cartRouter.registerCreateOne();
cartRouter.registerGetOne();
cartRouter.registerUpdateOne();

const deleteProductRouter = new DeleteProductRouter(cartSettings, cartHandler);
cartRouter.register(deleteProductRouter.routes);

module.exports = cartRouter.routes;