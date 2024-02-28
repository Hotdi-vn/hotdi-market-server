const ServiceMaster = require('../../templates/services/master');
const roleModel = require('../../models/role');
const roleSettings = require('../../settings/role');
class RoleService extends ServiceMaster {
    constructor(model, settings) {
        super(model, settings);
    }
}

const roleService = new RoleService(roleModel, roleSettings);

module.exports = roleService;