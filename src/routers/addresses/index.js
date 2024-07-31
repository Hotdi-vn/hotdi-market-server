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
addressRouter.registerCreateOne(true);
addressRouter.registerGetOne(true);
addressRouter.registerUpdateOne(true);
addressRouter.registerDeleteOne(true);

module.exports = addressRouter.routes;