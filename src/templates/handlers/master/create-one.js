class CreateOneHandler{
    constructor(service){
        this.service = service;
    }
    handler = async(request, reply) => {
        try{
            const userId = request.user.id;
            const data = await this.service.createOne(request.body, userId);
            reply.code(200).send({ data: data });
        } catch (error) {
            let errorCode = 'CREATE_ONE_ERROR';
            if (error.code) {
                errorCode = error.code;
            }
            console.error({ id: request.id, code: errorCode, detail: error });
            reply.code(400).send({ error: { id: request.id, code: errorCode } })
        }
    }
}

module.exports = CreateOneHandler;