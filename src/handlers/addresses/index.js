const addressService = require('../../services/addresses');
const HandlerMaster = require('../../templates/handlers/master');
class AddressHandler extends HandlerMaster {
    constructor(service) {
        super(service);
    }
}

const addressHandler = new AddressHandler(addressService);

addressHandler.registerGetAll();
addressHandler.registerCreateOne();
addressHandler.registerGetOne();
addressHandler.registerUpdateOne();
addressHandler.registerDeleteOne();

module.exports = addressHandler.getHandlers();