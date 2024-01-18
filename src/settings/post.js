class Post extends require('../templates/settings/master') {
    constructor() {
        super();
        super.resource = 'posts';
        super.settings = {
            _id: {
                schema: { type: 'string' },
                model: { type: String },
                isKey: true
            },
            title: {
                schema: { type: 'string' },
                model: { type: String },
                insert: true,
                update: true
            },
            content: {
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
if (!global.Post) {
    global.Post = new Post();
}

module.exports = global.Post;