const { singularize } = require('../../helpers/string')

class CreateOneHandler{
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

            const userId = request.user.id;
            const data = await this.service.createOne(request.body, userId);
            reply.code(200).send({ data: data });
        } catch (error) {
            let errorCode = 'CREATE_ONE_ERROR';
            if (error.code) {
                errorCode = error.code;
            }
            if (error.code === 11000) {
                errorCode = 'DUPLICATE_KEY_ERROR';
            }
            console.error({ id: request.id, code: errorCode, detail: error });
            reply.code(400).send({ error: { id: request.id, code: errorCode, message: error.message } })
        }
    }
}

module.exports = CreateOneHandler;