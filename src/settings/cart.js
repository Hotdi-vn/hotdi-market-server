class Cart extends require('../templates/settings/master') {
    constructor() {
        super();
        super.resource = 'carts';
        super.settings = {
            _id: {
                schema: { type: 'string' },
                model: { type: String },
                isKey: true
            },
            sellerId: {
                schema: { anyOf: [{ type: 'string' }, { type: 'object', additionalProperties: true }] },
                model: { type: String , ref : 'seller'},
                insert: true,
                update: true,
                required: true
            },
            cartItems: {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            productId: { anyOf: [{ type: 'string' }, { type: 'object', additionalProperties: true }]  },
                            quantity: { type: 'number', minimum: 1, maximum: 999999, default: 1 }
                        },
                        required: ['productId', 'quantity'],
                        additionalProperties: false
                    },
                    minItems: 1,
                    maxItems: 10 // TODO: limit???
                },
                model: {
                    type: [
                        {
                            productId: { type: String, required: true , ref : 'product', index: true },
                            quantity: { type: Number, required: true, default : 0 }
                        }
                    ],
                    default: []
                },
                insert: true,
                update: true,
                required: true
            },
            createdBy: {
                schema: { type: 'string', index: true },
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
        super.populate = ['sellerId', 'cartItems.productId'];
        super.limitMax = 10;
    }
}

// caching object setting
if (!global.Cart) {
    global.Cart = new Cart();
}

module.exports = global.Cart;