const cartItemService = require('../../services/cart-items');
const HandlerMaster = require('../../templates/handlers/master/index.js');
class CartItemHandler extends HandlerMaster {
    constructor(service) {
        super(service);
    }
    registerCreateOne() {
        const CreateOneHandler = require("./create-one");
        const createOneHandler = new CreateOneHandler(this.service);
        this.register("createOne", createOneHandler.handler);
      }
    registerUpdateOne() {
        const UpdateOneHandler = require("./update-one");
        const updateOneHandler = new UpdateOneHandler(this.service);
        this.register("updateOne", updateOneHandler.handler);
    }
}



const cartItemHandler = new CartItemHandler(cartItemService);

cartItemHandler.registerGetAll();
cartItemHandler.registerCreateOne();
cartItemHandler.registerGetOne();
cartItemHandler.registerUpdateOne();
cartItemHandler.registerDeleteOne();

module.exports = cartItemHandler.getHandlers();