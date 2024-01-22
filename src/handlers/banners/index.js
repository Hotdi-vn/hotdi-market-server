const bannerService = require('../../services/banners');
const HandlerMaster = require('../../templates/handlers/master');
class BannerHandler extends HandlerMaster {
    constructor(service) {
        super(service);
    }
}

const bannerHandler = new BannerHandler(bannerService);

bannerHandler.registerGetAll();
bannerHandler.registerCreateOne();
bannerHandler.registerGetOne();
bannerHandler.registerUpdateOne();
bannerHandler.registerDeleteOne();

module.exports = bannerHandler.getHandlers();