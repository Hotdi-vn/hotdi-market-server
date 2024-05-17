class UpdateOneHandler {
    constructor(service) {
        this.service = service;
    }
    handler = async(request, reply) => {
        try {

            //verify the productId is already exist
            const productService = require('../../services/products');
            const productObject = await productService.getOne(request.body?.productId)
            if(!productObject){
                console.error({ id: request.id, code: 'PRODUCT_NOT_FOUND'});
                reply.code(400).send({ error: { id: request.id, code: 'PRODUCT_NOT_FOUND' } })
            }

            const userId = request.user.id;
            const _id = request.params._id;
            const data = await this.service.updateOne(_id, request.body, userId);
            reply.code(200).send({ data: data });
        } catch (error) {
            const errorCode = error.code || 'UPDATE_ONE_ERROR';
            console.error({ id: request.id, code: errorCode, detail: error });
            reply.code(400).send({ error: { id: request.id, code: errorCode } })
        }
    }
}

module.exports = UpdateOneHandler;