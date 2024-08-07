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
    registerGetMyShop() {
        const GetMyShopHandler = require('./me/get-one');
        const getMyShopHandler = new GetMyShopHandler(this.service);
        this.register('getMyShop', getMyShopHandler.handler);
    }
    registerApproveStatus() {
        const ApproveStatusHandler = require('./approve-status');
        const approveStatusHandler = new ApproveStatusHandler(this.service);
        this.register('approveStatus', approveStatusHandler.handler);
    }
    registerRejectStatus() {
        const RejectStatusHandler = require('./reject-status');
        const rejectStatusHandler = new RejectStatusHandler(this.service);
        this.register('rejectStatus', rejectStatusHandler.handler);
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
shopHandler.registerGetMyShop();
shopHandler.registerApproveStatus();
shopHandler.registerRejectStatus();

module.exports = shopHandler.getHandlers();