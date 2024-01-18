const categoryHandler = require('../../handlers/categories');
const categorySettings = require('../../settings/category');
const RouterMaster = require('../../templates/routers/master');
class CategoryRouter extends RouterMaster {
    constructor(settings, handler) {
        super(settings, handler)
    }
}

const categoryRouter = new CategoryRouter(categorySettings, categoryHandler);

categoryRouter.registerGetAll();
categoryRouter.registerCreateOne();
categoryRouter.registerGetOne();
categoryRouter.registerUpdateOne();
categoryRouter.registerDeleteOne();

module.exports = categoryRouter.routes;