const shopService = require('../../services/shops');
const productService = require('../../services/products');
const HandlerMaster = require('../../templates/handlers/master');

class ShopHandler extends HandlerMaster {
    constructor(service) {
        super(service);
    }
    registerGetProductPublished() {
        const GetProductPublishedHandler = require('./get-product-published');
        const getProductPublishedHandler = new GetProductPublishedHandler(productService);
        this.register('getProductPublished', getProductPublishedHandler.handler);
    }
    registerCreateMyOne() {
        const CreateMyOneHandler = require('./me/create-one');
        const createMyOneHandler = new CreateMyOneHandler(this.service);
        this.register('createMyOne', createMyOneHandler.handler);
    }
    registerUpdateMyOne() {
        const UpdateMyOneHandler = require('./me/update-one');
        const updateMyOneHandler = new UpdateMyOneHandler(this.service);
        this.register('updateMyOne', updateMyOneHandler.handler);
    }
    registerSubmitMyOne() {
        const SubmitHandler = require('./me/submit');
        const submitHandler = new SubmitHandler(this.service);
        this.register('submitMyOne', submitHandler.handler);
    }
}

const shopHandler = new ShopHandler(shopService);

shopHandler.registerGetAll();
shopHandler.registerCreateOne();
shopHandler.registerGetOne();
shopHandler.registerUpdateOne();
shopHandler.registerDeleteOne();
shopHandler.registerGetProductPublished();
shopHandler.registerCreateMyOne();
shopHandler.registerUpdateMyOne();
shopHandler.registerSubmitMyOne();

module.exports = shopHandler.getHandlers();