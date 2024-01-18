const categoryService = require('../../services/categories');
const HandlerMaster = require('../../templates/handlers/master');
class CategoryHandler extends HandlerMaster {
    constructor(service) {
        super(service);
    }
}

const categoryHandler = new CategoryHandler(categoryService);

categoryHandler.registerGetAll();
categoryHandler.registerCreateOne();
categoryHandler.registerGetOne();
categoryHandler.registerUpdateOne();
categoryHandler.registerDeleteOne();

module.exports = categoryHandler.getHandlers();