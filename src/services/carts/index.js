const ServiceMaster = require('../../templates/services/master');
const cartModel = require('../../models/cart');
const cartSettings = require('../../settings/cart');
class CartService extends ServiceMaster {
    constructor(model, settings) {
        super(model, settings);
    }
}

const cartService = new CartService(cartModel, cartSettings);

module.exports = cartService;