const ServiceMaster = require('../../templates/services/master');
const bannerModel = require('../../models/banner');
const bannerSettings = require('../../settings/banner');
class BannerService extends ServiceMaster {
    constructor(model, settings) {
        super(model, settings);
    }
}

const bannerService = new BannerService(bannerModel, bannerSettings);

module.exports = bannerService;