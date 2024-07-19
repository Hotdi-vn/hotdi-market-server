class GetProductPublishedHandler {
    constructor(service) {
        this.service = service; // productService
    }
    handler = async (request, response) => {
        try {
            const filters = { };
            this.service.settings.extractFilterDataFromSender(filters, request.query);
            const { shopId } = request.params;
            filters.createdBy = shopId;
            filters.publishStatus = "Published" ;
            const search = '';
            let skip = 0;
            let limit = 0;
            if (request.query.skip !== undefined) {
                skip = parseInt(request.query.skip);
            }
            if (request.query.limit !== undefined) {
                limit = parseInt(request.query.limit);
            }
            filters.inventoryStatus = 'InStock'

            
            let sortBy = 'updatedAt';
            if (request.query.sortBy) {
                sortBy = request.query.sortBy;
            }
            let sortType = -1;
            if (request.query.sortType) {
                sortType = request.query.sortType;
            }
            const sort = {};
            sort[sortBy] = sortType;
            let populate = '';
            if (request.query.populate) {
                populate = request.query.populate;
            }
            let exclude = [];
            if (request.query.exclude) {
                exclude = request.query.exclude;
            }
            const data = await this.service.getAll(filters, sort, search, skip, limit, populate, exclude);
            response.code(200).send({ data: data.items, skip, limit, total: data.total });
        } catch (error) {
            let errorCode = 'GET_PRODUCT_ERROR';
            if (error.code) {
                errorCode = error.code;
            }
            console.error({ id: request.id, code: errorCode, detail: error });
            response.code(400).send({ error: { id: request.id, code: errorCode } })
        }
    }
}

module.exports = GetProductPublishedHandler;
