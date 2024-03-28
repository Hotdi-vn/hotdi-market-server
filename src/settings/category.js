class Category extends require('../templates/settings/master') {
    constructor() {
        super();
        super.resource = 'categories';
        super.settings = {
            _id: {
                schema: { type: 'string' },
                model: { type: String },
                insert: true
            },
            name: {
                schema: { type: 'string' },
                model: { type: String },
                insert: true,
                update: true
            },
            imageUrl: {
                schema: { type: 'string' },
                model: { type: String },
                insert: true,
                update: true
            },
            parent: {
                schema: { anyOf: [{ type: 'string' }, { type: 'object', additionalProperties: true }] },
                model: { type: String, default: 0, ref: 'category' },
                insert: true,
                update: true,
                filter: true
            },
            ancestors: {
                schema: {
                    type: 'array',
                    items: {
                        type: ['string', 'object'],
                        additionalProperties: true
                    }
                },
                model: { type: [{ type: String, ref: 'category' }], default: [] }
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
        super.ancentorsEnabled = true;
        super.populate = ['parent', 'ancestors', 'parent ancestors'];
    }
}

// caching object setting
if (!global.Category) {
    global.Category = new Category();
}

module.exports = global.Category;