class Permission extends require('../templates/settings/master') {
    constructor() {
        super();
        super.resource = 'permissions';
        super.settings = {
            _id: {
                schema: { type: 'string' },
                model: { type: String },
                isKey: true
            },
            // permission: {resource: {action: {filters}}}
            permissions: {
                schema: { type: 'object' },
                model: { type: Object },
                hidden: true
            },
            roles: {
                schema: { type: 'array' },
                model: { type: Array },
                hidden: true
            },
            createdBy: {
                schema: { type: 'string' },
                model: { type: String },
                hidden: true
            },
            createdAt: {
                schema: { type: 'number' },
                model: { type: Number, default: Date.now }
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
if (!global.Permission) {
    global.Permission = new Permission();
}

module.exports = global.Permission;