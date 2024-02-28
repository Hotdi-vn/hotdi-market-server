const permissionService = require('../../services/permissions');
const HandlerMaster = require('../../templates/handlers/master');
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

module.exports = permissionHandler.getHandlers();