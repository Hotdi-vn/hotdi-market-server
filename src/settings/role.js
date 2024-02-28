class Role extends require('../templates/settings/master') {
    constructor() {
        super();
        super.resource = 'roles';
        super.settings = {
            _id: {
                schema: { type: 'string' , enum: ['admin', 'buyer', 'seller']},
                model: { type: String },
                insert: true
            },
            // permission: {resource: {action: {filters}}}
            permissions: {
                schema: { type: 'object', additionalProperties:true, description: 'permission: {resource: {action: {filters}}}' },
                model: { type: Object },
                insert: true,
                update: true
            },
            createdBy: {
                schema: { type: 'string' },
                model: { type: String },
                hidden: true
            },
            createdAt: {
                schema: { type: 'number' },
                model: { type: Number, default: Date.now },
                hidden: true
            },
            updatedBy: {
                schema: { type: 'string' },
                model: { type: String },
                hidden: true
            },
            updatedAt: {
                schema: { type: 'number' },
                model: { type: Number, default: Date.now },
                hidden: true
            }
        }
    }
}

// caching object setting
if (!global.Role) {
    global.Role = new Role();
}

module.exports = global.Role;