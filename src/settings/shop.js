class Shop extends require('../templates/settings/master') {
    constructor() {
        super();
        super.resource = 'shops';
        super.settings = {
            _id: {
                schema: { type: 'string' },
                model: { type: String },
                isKey: true
            },
            username: {
                schema: { type: 'string' },
                model: { type: String, unique: true },
                insert: true
            },
            name: {
                schema: { type: 'string' },
                model: { type: String, },
                insert: true,
                update: true,
                required: true
            },
            avatarImageId: {
                schema: {
                    anyOf: [{ type: 'string' }, {
                        type: 'object',
                        additionalProperties: true
                    }]
                },
                model: { type: String, ref: 'file' },
                insert: true,
                update: true
            },
            coverImageId: {
                schema: {
                    anyOf: [{ type: 'string' }, {
                        type: 'object',
                        additionalProperties: true
                    }]
                },
                model: { type: String, ref: 'file' },
                insert: true,
                update: true
            },
            description: {
                schema: { type: 'string' },
                model: { type: String},
                insert: true,
                update: true,
                required: true
            },
            addresses: {
                schema: {
                    type: 'array',
                    items: {
                        anyOf: [{ type: 'string' }, {
                            type: 'object',
                            additionalProperties: true
                        }]
                    },
                    minItems: 1,
                    maxItems: 5
                },
                model: {
                    type: [
                        { type: String, required: true , ref : 'address' },
                    ],
                    default: []
                },
                insert: true,
                update: true
            },
            userInCharge: {
                schema: { type: 'string', maxLength: 64 },
                model: { type: String },
                insert: true,
                update: true,
                required: true
            },
            phone: {
                schema: { type: 'string', maxLength: 11, pattern: "^[0-9]{1,11}$"},
                model: { type: String },
                insert: true,
                update: true,
                required: true
            },
            email: {
                schema: { type: 'string', maxLength: 64, pattern: "^[^\s@]+@[^\s@]+\.[^\s@]+$" },
                model: { type: String },
                insert: true,
                update: true,
                required: true
            },
            taxCode: {
                schema: { type: 'string', maxLength: 14, pattern: "^[0-9]{1,14}$" },
                model: { type: String },
                insert: true,
                update: true,
                required: true
            },
            businessLicense: {
                schema: { type: 'string', maxLength: 16, pattern: "^[0-9]{1,16}$" },
                model: { type: String, unique: true, sparse: true },
                insert: true,
                update: true
            },
            status: {
                schema: { type: 'string', enum: ['New', 'WaitingApproval', 'Rejected', 'Approved'], default: 'New' },
                model: { type: String }
            },
            adminStatusUpdater: {
                schema: { type: 'string' },
                model: { type: String }
            },
            adminStatusComment: {
                schema: { type: 'string' },
                model: { type: String },
            },
            adminStatusUpdatedAt: {
                schema: { type: 'number' },
                model: { type: Number }
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
        super.populate = ['avatarImageId', 'coverImageId', 'addresses', 'avatarImageId coverImageId', 'avatarImageId coverImageId addresses'];
    }
}

// caching object setting
if (!global.Shop) {
    global.Shop = new Shop();
}

module.exports = global.Shop;