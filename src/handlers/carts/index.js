const cartService = require('../../services/carts');
const HandlerMaster = require('../../templates/handlers/master');
const shopService = require('../../services/shops');

class CartHandler extends HandlerMaster {
    constructor(service) {
        super(service);
    }
    registerCreateOne(options={}) {
        const CreateOneHandler = require("./create-one");
        const createOneHandler = new CreateOneHandler(this.service, options={checkResource: [shopService]});
        this.register("createOne", createOneHandler.handler);
    }
    registerUpdateOne(options={}) {
        const UpdateOneHandler = require("./update-one");
        const updateOneHandler = new UpdateOneHandler(this.service, options={checkResource: [shopService]});
        this.register("updateOne", updateOneHandler.handler);
    }
    registerDeleteProduct() {
        const DeleteProductHandler = require("./delete-product");
        const deleteProductHandler = new DeleteProductHandler(this.service);
        this.register("deleteProduct", deleteProductHandler.handler);
    }
}

const cartHandler = new CartHandler(cartService);

cartHandler.registerGetMyAll();
cartHandler.registerGetAll();
cartHandler.registerCreateOne(options={checkResource: [shopService]});
cartHandler.registerGetOne();
cartHandler.registerUpdateOne(options={checkResource: [shopService]});
cartHandler.registerDeleteProduct();

module.exports = cartHandler.getHandlers();