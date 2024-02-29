const permissionHandler = require('../../handlers/permissions');
const permissionSettings = require('../../settings/permission');
const RouterMaster = require('../../templates/routers/master');
const UpdateRoleRouter = require('./update-role');
class PermissionRouter extends RouterMaster {
    constructor(settings, handler) {
        super(settings, handler)
    }
}

const permissionRouter = new PermissionRouter(permissionSettings, permissionHandler);

//permissionRouter.registerGetAll();
permissionRouter.registerCreateOne(true);
permissionRouter.registerGetOne();
permissionRouter.registerUpdateOne(true);
permissionRouter.registerDeleteOne(true);

// custom routers
const updateRoleRouter = new UpdateRoleRouter(permissionSettings, permissionHandler);
permissionRouter.register(updateRoleRouter.routes);

module.exports = permissionRouter.routes;