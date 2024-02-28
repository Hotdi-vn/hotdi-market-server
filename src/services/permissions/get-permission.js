const permissionModel = require('../../models/permission');
const roleModel = require('../../models/role');

const getPermission = async (userId, resource, action) => {
    return new Promise(async (resolve, reject) => {
        try{
            if (!userId) {
                resolve(false);
                return;
            }
            const permission = await permissionModel.findById(userId);
            if (!permission) {
                resolve(false);
                return;
            }
            if (permission.roles && permission.roles.includes('super-admin')) {
                resolve({}); // no filter
                return;
            }
            if (!permission.permissions) {
                resolve(false);
                return;
            }
            let permissions = permission.permissions;
            // get permissions from roles
            if (permission.roles){
                const roles = await roleModel.getFromIdList(permission.roles);
                for (let role of roles.items) {
                    if (role.permissions) {
                        permissions = {...permissions, ...role.permissions};
                    }
                }
            }
            //
            if (!permissions[resource]) {
                resolve(false);
                return;
            }
            if (!permissions[resource][action]) {
                resolve(false);
                return;
            }
            resolve(permissions[resource][action]); // return filter
        } catch (err) {
            reject(err);
        }
        
    });
}

module.exports = getPermission;