const permissionService = require('../../services/permissions');
const HandlerMaster = require('../../templates/handlers/master');
const UpdateRoleHandler = require('./update-role');
class PermissionHandler extends HandlerMaster {
    constructor(service) {
        super(service);
    }
}
const permissionHandler = new PermissionHandler(permissionService);

permissionHandler.registerGetAll();
permissionHandler.registerCreateOne();
permissionHandler.registerGetOne();
permissionHandler.registerUpdateOne();
permissionHandler.registerDeleteOne();

const updateRoleHandler = new UpdateRoleHandler(permissionService);
permissionHandler.register('updateRole',updateRoleHandler.handler);

module.exports = permissionHandler.getHandlers();
