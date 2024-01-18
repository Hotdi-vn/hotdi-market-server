const sellerService = require('../../services/sellers');
const HandlerMaster = require('../../templates/handlers/master');
class SellerHandler extends HandlerMaster {
    constructor(service) {
        super(service);
    }
}

const sellerHandler = new SellerHandler(sellerService);

sellerHandler.registerGetAll();
sellerHandler.registerCreateOne();
sellerHandler.registerGetOne();
sellerHandler.registerUpdateOne();
sellerHandler.registerDeleteOne();

module.exports = sellerHandler.getHandlers();