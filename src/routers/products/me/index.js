const myProductHandler = require('../../../handlers/products/me');
const myProductSettings = require('../../../settings/my-products');
const RouterMaster = require('../../../templates/routers/master');
class MyProductRouter extends RouterMaster {
    constructor(settings, handler) {
        super(settings, handler)
    }
}

const myProductRouter = new MyProductRouter(myProductSettings, myProductHandler);

myProductRouter.registerGetAll();
myProductRouter.registerCreateOne();
myProductRouter.registerGetOne();
myProductRouter.registerUpdateOne();
myProductRouter.registerDeleteOne();

module.exports = myProductRouter.routes;