class GetAllHandler {
    constructor(service, options={}) {
        this.service = service;
        this.options = options;
    }

    handler = async(request, reply) => {
        try{
            const filters = {};
            const sort = {};
            const search = '';
            let skip = 0;
            let limit = 0;
            if (request.query.skip !== undefined) {
                skip = parseInt(request.query.skip);
            }
            if (request.query.limit !== undefined) {
                limit = parseInt(request.query.limit);
            }
            if (this.options.authentication) {
                const userId = request.user.id;
                if (this.options.userKey){
                    filters[this.options.userKey] = userId;
                }
            }
            this.service.settings.extractFilterDataFromSender(filters, request.query);
            const data = await this.service.getAll(filters, sort, search, skip, limit);
            reply.code(200).send({ data: data.items, skip, limit, total: data.total });
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
module.exports = GetAllHandler;