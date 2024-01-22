const bannerHandler = require('../../handlers/banners');
const bannerSettings = require('../../settings/banner');
const RouterMaster = require('../../templates/routers/master');
class BannerRoute extends RouterMaster {
    constructor(settings, handler) {
        super(settings, handler)
    }
}

const bannerRouter = new BannerRoute(bannerSettings, bannerHandler);

bannerRouter.registerGetAll();
bannerRouter.registerCreateOne();
bannerRouter.registerGetOne();
bannerRouter.registerUpdateOne();
bannerRouter.registerDeleteOne();

module.exports = bannerRouter.routes;