const { singularize } = require('../../../templates/helpers/string')
const permissionModel = require('../../../models/permission');

class UpdateMyOneHandler {
    constructor(service, options = {}) {
        this.service = service;
        this.options = options;
    }
    handler = async(request, reply) => {
        try {
            if (this.options['checkResource'] !== undefined) {
                for (let service of this.options['checkResource']) {
                    let resource_singular = singularize(service.settings.resource);
                    const object = await service.getOne(request.body[`${resource_singular}Id`])
                    if(!object){
                        console.error({ id: request.id, code: `${resource_singular.toUpperCase()}_NOT_FOUND`});
                        reply.code(400).send({ error: { id: request.id, code: `${resource_singular.toUpperCase()}_NOT_FOUND` } })
                        return;
                    }
                }
            }

            const userId = request.user.id; 
            let data = await this.service.updateOne(userId, request.body, userId);
            if (request.query.populate) {
                data = await this.service.getOne(_id, request.query.populate);
            }
            reply.code(200).send({ data: data });
        } catch (error) {
            let errorCode = 'UPDATE_ONE_ERROR';
            if (error.code) {
                errorCode = error.code;
            }
            console.error({ id: request.id, code: errorCode, detail: error });
            reply.code(400).send({ error: { id: request.id, code: errorCode } })
        }
    }
}

// const checkIsAdmin = async (userId) => {
//     const permission = await permissionModel.findById(userId);
//     console.log(permission.roles.includes('super-admin') || permission.roles.includes('admin'))
//     if (permission && permission.roles && (permission.roles.includes('super-admin') || permission.roles.includes('admin'))) {
//         return true;
//     } else {
//         return false;
//     }
// }

module.exports = UpdateMyOneHandler;