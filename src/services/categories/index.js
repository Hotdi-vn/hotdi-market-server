const ServiceMaster = require('../../templates/services/master');
const categoryModel = require('../../models/category');
const categorySettings = require('../../settings/category');
class CategoryService extends ServiceMaster {
    constructor(model, settings) {
        super(model, settings);
    }
}

const categoryService = new CategoryService(categoryModel, categorySettings);

module.exports = categoryService;