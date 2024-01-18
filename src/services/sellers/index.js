const ServiceMaster = require('../../templates/services/master');
const sellerModel = require('../../models/seller');
const sellerSettings = require('../../settings/seller');
class SellerService extends ServiceMaster {
    constructor(model, settings) {
        super(model, settings);
    }
}

const sellerService = new SellerService(sellerModel, sellerSettings);

module.exports = sellerService;