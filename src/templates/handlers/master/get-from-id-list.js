class GetFromIdListHandler {
    constructor(service, options={}) {
        this.service = service;
        this.options = options;
    }

    handler = async(request, reply) => {
        try{
            const idList = request.params.idList.split(',');
            const data = await this.service.getFromIdList(idList);
            reply.code(200).send({ data: data.items });
        } catch (error) {
            let errorCode = 'GET_ALL_ERROR';
            if (error.code) {
                errorCode = error.code;
            }
            console.error({ id: request.id, code: errorCode, detail: error });
            reply.code(400).send({ error: { id: request.id, code: errorCode } })
        }
    }
}   
module.exports = GetFromIdListHandler;