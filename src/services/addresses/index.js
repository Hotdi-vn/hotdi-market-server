const ServiceMaster = require('../../templates/services/master');
const addressModel = require('../../models/address');
const addressSettings = require('../../settings/address');
class AddressService extends ServiceMaster {
    constructor(model, settings) {
        super(model, settings);
    }
}

const addressService = new AddressService(addressModel, addressSettings);

module.exports = addressService;