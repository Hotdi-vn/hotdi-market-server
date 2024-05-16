const cartService = require('../../services/carts');
const HandlerMaster = require('../../templates/handlers/master');
class CartHandler extends HandlerMaster {
    constructor(service) {
        super(service);
    }
}

const cartHandler = new CartHandler(cartService);

cartHandler.registerGetMyAll();
cartHandler.registerGetAll();
cartHandler.registerCreateOne();
cartHandler.registerGetOne();
cartHandler.registerUpdateOne();
cartHandler.registerDeleteOne();

module.exports = cartHandler.getHandlers();