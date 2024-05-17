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
            createdBy: {
                schema: { type: 'string' },
                model: { type: String , unique: true, index: true}
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
if (!global.Cart) {
    global.Cart = new Cart();
}

module.exports = global.Cart;