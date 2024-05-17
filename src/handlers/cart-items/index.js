const cartItemService = require('../../services/cart-items');
const HandlerMaster = require('../../templates/handlers/master/index.js');
class CartItemHandler extends HandlerMaster {
    constructor(service) {
        super(service);
    }
    registerCreateOne(options={}) {
        const CreateOneHandler = require("./create-one");
        const createOneHandler = new CreateOneHandler(this.service, options);
        this.register("createOne", createOneHandler.handler);
      }
}



const cartItemHandler = new CartItemHandler(cartItemService);

cartItemHandler.registerGetAll();
cartItemHandler.registerCreateOne(options={checkResource: ['product']});
cartItemHandler.registerGetOne();
cartItemHandler.registerGetMyAll();
cartItemHandler.registerUpdateOne(options={checkResource: ['product']});
cartItemHandler.registerDeleteOne();

module.exports = cartItemHandler.getHandlers();