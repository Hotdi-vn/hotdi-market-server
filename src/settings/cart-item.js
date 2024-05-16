class CartItem extends require('../templates/settings/master') {
    constructor() {
        super();
        super.resource = 'cart-items';
        super.settings = {
            _id: {
                schema: { type: 'string' },
                model: { type: String },
                isKey: true
            },
            cartId: {
                schema: { type: 'string' },
                model: { type: String },
                insert: true,
                update: true,
                required: true
            },
            productId: {
                schema: { type: 'string' },
                model: { type: String },
                insert: true,
                update: true,
                required: true
            },
            pricePerUnit: {
                schema: { type: 'number', minimum: 1, maximum: 999999999, default: 100000 },
                model: { type: Number },
                insert: true,
                update: true,
                required: true
            },
            quantity: {
                schema: { type: 'number', minimum: 1, maximum: 999999, default: 1 },
                model: { type: Number },
                insert: true,
                update: true,
                required: true
            },
            createdBy: {
                schema: { type: 'string' },
                model: { type: String }
            },
            createdAt: {
                schema: { type: 'number' },
                model: { type: Number, default: Date.now }
            },
            updatedBy: {
                schema: { type: 'string' },
                model: { type: String }
            },
            updatedAt: {
                schema: { type: 'number' },
                model: { type: Number, default: Date.now }
            }
        };
    }
}

// caching object setting
if (!global.CartItem) {
    global.CartItem = new CartItem();
}

module.exports = global.CartItem;