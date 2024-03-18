class UpdateOneHandler {
    constructor(service) {
        this.service = service;
    }
    handler = async(request, reply) => {
        try {
            //verify the category is already exist
            const categoriesService = require('../../services/categories');
            const categoryObject = await categoriesService.getOne(request.body?.categoryId)
            if(!categoryObject){
                console.error({ id: request.id, code: 'CATEGORY_NOT_FOUND' });
                reply.code(400).send({ error: { id: request.id, code: 'CATEGORY_NOT_FOUND' } })
            }

            let minImages = 1;
            let maxImages = 10;
            const images = request.body.images || [];
            if (images.length < minImages || images.length > maxImages){
                console.error({ id: request.id, code: 'INVALID_IMAGE_COUNT'});
                reply.code(400).send({ error: { id: request.id, code: 'INVALID_IMAGE_COUNT' } })
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