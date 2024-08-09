const addressHandler = require('../../handlers/addresses');
const addressSettings = require('../../settings/address');
const RouterMaster = require('../../templates/routers/master');
class AddressRoute extends RouterMaster {
    constructor(settings, handler) {
        super(settings, handler)
    }
}

const addressRouter = new AddressRoute(addressSettings, addressHandler);

addressRouter.registerGetAll(true);
addressRouter.registerCreateOne();
addressRouter.registerGetOne();
addressRouter.registerUpdateOne();
addressRouter.registerDeleteOne();

module.exports = addressRouter.routes;