const permissionHandler = require('../../handlers/permissions');
const permissionSettings = require('../../settings/permission');
const RouterMaster = require('../../templates/routers/master');
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

module.exports = permissionRouter.routes;