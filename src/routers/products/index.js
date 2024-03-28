const productHandler = require("../../handlers/products");
const productSettings = require("../../settings/product");
const RouterMaster = require("../../templates/routers/master");
class ProductRouter extends RouterMaster {
  constructor(settings, handler) {
    super(settings, handler);
  }

  registerGetAllMyProductS(authentication = false) {
    const GetAllMyProductsRouter = require("./me/get-all");
    const getAllMyProductRouter = new GetAllMyProductsRouter(
      this.settings,
      this.handler,
      authentication
    );
    this.register(getAllMyProductRouter.routes);
  }
}

const productRouter = new ProductRouter(productSettings, productHandler);

productRouter.registerGetAll();
productRouter.registerCreateOne();
productRouter.registerGetOne();
productRouter.registerUpdateOne();
productRouter.registerDeleteOne();
productRouter.registerGetAllMyProductS(true);

module.exports = productRouter.routes;
