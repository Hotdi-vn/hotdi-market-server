const ServiceMaster = require('../../templates/services/master');
const permissionModel = require('../../models/permission');
const permissionSettings = require('../../settings/permission');
class PermissionService extends ServiceMaster {
    constructor(model, settings) {
        super(model, settings);
    }
}

const permissionService = new PermissionService(permissionModel, permissionSettings);
const getPermission = require('./get-permission');
const hasRight = require('./has-right');
permissionService.register('getPermission',getPermission);
permissionService.register('hasRight',hasRight);

module.exports = permissionService;