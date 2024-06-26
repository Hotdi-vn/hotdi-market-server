class Category extends require('../templates/settings/master') {
    constructor() {
        super();
        super.resource = 'categories';
        super.settings = {
            _id: {
                model: { type: String },
                hidden: true
            },
            id: {
                schema: { type: 'string' },
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
                schema: { anyOf: [{ type: 'null' }, { type: 'string' }, { type: 'object', additionalProperties: true }] },
                model: { type: String, ref: 'category' },
                insert: true,
                update: true,
                filter: true
            },
            ancestors: {
                schema: {
                    type: 'array',
                    items: {anyOf: [{ type: 'null' }, { type: 'string' }, { type: 'object', additionalProperties: true }]}
                },
                model: { type: [{ type: String, ref: 'category' }], default: [] }
            },
            showLandingPage: {
                schema: { type: 'boolean' },
                model: { type: Boolean, default: false },
                insert: true,
                update: true
            },
            isLeaf: {
                schema: { type: 'boolean' },
                model: { type: Boolean, default: true }
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