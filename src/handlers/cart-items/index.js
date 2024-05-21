const cartItemService = require('../../services/cart-items');
const HandlerMaster = require('../../templates/handlers/master/index.js');
// const Product = require('../../settings/product');
const productService = require('../../services/products');
class CartItemHandler extends HandlerMaster {
    constructor(service) {
        super(service);
    }
    registerCreateOne(options={}) {
        const CreateOneHandler = require("./create-one");
        const createOneHandler = new CreateOneHandler(this.service, options={checkResource: [productService]});
        this.register("createOne", createOneHandler.handler);
      }
}



const cartItemHandler = new CartItemHandler(cartItemService);

cartItemHandler.registerGetAll();
cartItemHandler.registerCreateOne(options={checkResource: [productService]});
cartItemHandler.registerGetOne();
cartItemHandler.registerGetMyAll();
cartItemHandler.registerUpdateOne(options={checkResource: [productService]});
cartItemHandler.registerDeleteOne();

module.exports = cartItemHandler.getHandlers();