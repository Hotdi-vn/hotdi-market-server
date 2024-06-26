class CreateOneHandler{
    constructor(service){
        this.service = service;
    }
    handler = async(request, reply) => {
        try{

            //verify the category is already exist
            const categoriesService = require('../../services/categories');
            const categoryObject = await categoriesService.getOne(request.body?.categoryId)
            if(!categoryObject){
                console.error({ id: request.id, code: 'CATEGORY_NOT_FOUND'});
                reply.code(400).send({ error: { id: request.id, code: 'CATEGORY_NOT_FOUND' } })
            }

            //check auto update Inventory Status in case InventoryManagement is true
            if(request.body.inventoryManagementOption){
                request.body.inventoryStatus = request.body.stockQuantity === 0 ? 'OutOfStock' : 'InStock'
            }
            
            const userId = request.user.id;
            let data = await this.service.createOne(request.body, userId);
            if (request.query.populate) {
                data = await this.service.getOne(data._id, request.query.populate);
            }
            reply.code(200).send({ data: data });
        } catch (error) {
            const errorCode = error.code || 'CREATE_ONE_ERROR';
            console.error({ id: request.id, code: errorCode, detail: error });
            reply.code(400).send({ error: { id: request.id, code: errorCode } })
        }
    }
}

module.exports = CreateOneHandler;