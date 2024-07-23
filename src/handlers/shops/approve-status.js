const { singularize } = require('../../templates/helpers/string')

class ApproveStatusHandler{
    constructor(service, options={}){
        this.service = service;
        this.options = options;
    }
    handler = async(request, reply) => {
        try{
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
            let populate = '';
            const userId = request.user.id;

            let statusData = {
                status: 'Approved',
                adminStatusUpdater: userId,
                adminStatusUpdatedAt: Date.now()
            }
            const _id = request.params._id;
            let data = await this.service.updateOne(_id, request.body, userId, false, statusData);
            reply.code(200).send({ data: data });
        } catch (error) {
            let errorCode = 'APPROVE_STATUS_ERROR';
            if (error.code) {
                errorCode = error.code;
            }
            console.error({ id: request.id, code: errorCode, detail: error });
            reply.code(400).send({ error: { id: request.id, code: errorCode } })
        }
    }
}

module.exports = ApproveStatusHandler;