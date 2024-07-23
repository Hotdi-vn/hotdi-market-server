class GetMyShopHandler {
    constructor(service) {
        this.service = service;
    }

    handler = async(request, reply) => {
        try{
            let populate = '';
            const userId = request.user.id;            
            if (request.query.populate) {
                populate = request.query.populate;
            }
            const data = await this.service.getOne(userId, populate);
            reply.code(200).send({ data: data });
        } catch (error) {
            let errorCode = 'GET_ONE_ERROR';
            if (error.code) {
                errorCode = error.code;
            }
            console.error({ id: request.id, code: errorCode, detail: error });
            reply.code(400).send({ error: { id: request.id, code: errorCode } })
        }
    }
}

module.exports = GetMyShopHandler;