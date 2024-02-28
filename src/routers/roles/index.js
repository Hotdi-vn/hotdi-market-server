const roleHandler = require('../../handlers/roles');
const roleSettings = require('../../settings/role');
const RouterMaster = require('../../templates/routers/master');
class RoleRouter extends RouterMaster {
    constructor(settings, handler) {
        super(settings, handler)
    }
}

const roleRouter = new RoleRouter(roleSettings, roleHandler);

//roleRouter.registerGetAll();
roleRouter.registerCreateOne(true);// check authorization
roleRouter.registerGetOne();
roleRouter.registerUpdateOne(true);// check authorization
roleRouter.registerDeleteOne();

module.exports = roleRouter.routes;