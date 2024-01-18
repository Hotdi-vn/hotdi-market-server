class Category extends require('../templates/settings/master') {
    constructor() {
        super();
        super.resource = 'categories';
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
            imageUrl: {
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
if (!global.Category) {
    global.Category = new Category();
}

module.exports = global.Category;