const cartService = require('../../services/carts');
const HandlerMaster = require('../../templates/handlers/master');
const sellerService = require('../../services/sellers');

class CartHandler extends HandlerMaster {
    constructor(service) {
        super(service);
    }
    registerCreateOne(options={}) {
        const CreateOneHandler = require("./create-one");
        const createOneHandler = new CreateOneHandler(this.service, options={checkResource: [sellerService]});
        this.register("createOne", createOneHandler.handler);
    }
}

const cartHandler = new CartHandler(cartService);

cartHandler.registerGetMyAll();
cartHandler.registerGetAll();
cartHandler.registerCreateOne(options={checkResource: [sellerService]});
cartHandler.registerGetOne();
cartHandler.registerUpdateOne();
cartHandler.registerDeleteOne();

module.exports = cartHandler.getHandlers();