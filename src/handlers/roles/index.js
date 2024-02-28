const roleService = require('../../services/roles');
const HandlerMaster = require('../../templates/handlers/master');
class RoleHandler extends HandlerMaster {
    constructor(service) {
        super(service);
    }
}

const roleHandler = new RoleHandler(roleService);

roleHandler.registerGetAll();
roleHandler.registerCreateOne();
roleHandler.registerGetOne();
roleHandler.registerUpdateOne();
roleHandler.registerDeleteOne();

module.exports = roleHandler.getHandlers();