const ServiceMaster = require('../../templates/services/master');
const shopModel = require('../../models/shop');
const shopSettings = require('../../settings/shop');
class ShopService extends ServiceMaster {
    constructor(model, settings) {
        super(model, settings);
    }
}

const shopService = new ShopService(shopModel, shopSettings);
const getProductPublished = require('./get-product-published');
shopService.register('getProductPublished', getProductPublished);

module.exports = shopService;