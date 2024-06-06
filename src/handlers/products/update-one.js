const categoriesService = require('../../services/categories');

class UpdateOneHandler {
    constructor(service) {
        this.service = service;
    }
    handler = async (request, reply) => {
        try {

            //verify the category is already exist
            if (request.body.categoryId) {
                const categoryObject = await categoriesService.getOne(request.body?.categoryId)
                if (!categoryObject) {
                    console.error({ id: request.id, code: 'CATEGORY_NOT_FOUND' });
                    reply.code(400).send({ error: { id: request.id, code: 'CATEGORY_NOT_FOUND' } })
                }
            }
            //check auto update Inventory Status in case InventoryManagement is true
            if (request.body.inventoryManagementOption) {
                request.body.inventoryStatus = request.body.stockQuantity === 0 ? 'OutOfStock' : 'InStock'
            }

            const userId = request.user.id;
            const _id = request.params._id;
            const data = await this.service.updateOne(_id, request.body, userId, true);
            reply.code(200).send({ data: data });
        } catch (error) {
            const errorCode = error.code || 'UPDATE_ONE_ERROR';
            console.error({ id: request.id, code: errorCode, detail: error });
            reply.code(400).send({ error: { id: request.id, code: errorCode } })
        }
    }
}

module.exports = UpdateOneHandler;