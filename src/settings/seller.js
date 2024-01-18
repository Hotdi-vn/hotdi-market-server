class Seller extends require('../templates/settings/master') {
    constructor() {
        super();
        super.resource = 'sellers';
        super.settings = {
            _id: {
                schema: { type: 'string' },
                model: { type: String },
                isKey: true
            },
            name: {
                schema: { type: 'string' },
                model: { type: String },
                insert: true,
                update: true
            },
            avatarUrl: {
                schema: { type: 'string' },
                model: { type: String },
                insert: true,
                update: true
            },
            coverImageUrl: {
                schema: { type: 'string' },
                model: { type: String },
                insert: true,
                update: true
            },
            description: {
                schema: { type: 'string' },
                model: { type: String },
                insert: true,
                update: true
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
        }
    }
}

// caching object setting
if (!global.Seller) {
    global.Seller = new Seller();
}

module.exports = global.Seller;