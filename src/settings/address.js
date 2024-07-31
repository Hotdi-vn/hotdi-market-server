class Address extends require('../templates/settings/master') {
    constructor() {
        super();
        super.resource = 'addresses';
        super.settings = {
            _id: {
                schema: { type: 'string' },
                model: { type: String },
                isKey: true
            },
            city: {
                schema: {
                    type: 'object',
                    properties: {
                        code: { type: 'string' },
                        name: { type: 'string' },
                        parent: { type: 'string' }
                    },
                    required: ['code', 'name', 'parent'],
                    additionalProperties: false
                },
                model: {
                    type: {
                        code: { type: String, required: true },
                        name: { type: String, required: true },
                        parent: { type: String, required: true }
                    },
                },
                insert: true,
                update: true,
                required: true
            },
            district: {
                schema: {
                    type: 'object',
                    properties: {
                        code: { type: 'string' },
                        name: { type: 'string' },
                        parent: { type: 'string' }
                    },
                    required: ['code', 'name', 'parent'],
                    additionalProperties: false
                },
                model: {
                    type: {
                        code: { type: String, required: true },
                        name: { type: String, required: true },
                        parent: { type: String, required: true }
                    },
                },
                insert: true,
                update: true,
                required: true
            },
            ward: {
                schema: {
                    type: 'object',
                    properties: {
                        code: { type: 'string' },
                        name: { type: 'string' },
                        parent: { type: 'string' }
                    },
                    required: ['code', 'name', 'parent'],
                    additionalProperties: false
                },
                model: {
                    type: {
                        code: { type: String, required: true },
                        name: { type: String, required: true },
                        parent: { type: String, required: true }
                    },
                },
                insert: true,
                update: true,
                required: true
            },
            address: {
                schema: { type: 'string' },
                model: { type: String },
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
        }
    }
}

// caching object setting
if (!global.Address) {
    global.Address = new Address();
}

module.exports = global.Address;