const ServiceMaster = require('../../templates/services/master');
const cartItemModel = require('../../models/cart-item');
const cartItemSettings = require('../../settings/cart-item');
class CartItemService extends ServiceMaster {
    constructor(model, settings) {
        super(model, settings);
    }
}

const cartItemService = new CartItemService(cartItemModel, cartItemSettings);

module.exports = cartItemService;