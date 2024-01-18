const ServiceMaster = require('../../templates/services/master');
const postModel = require('../../models/post');
const postSettings = require('../../settings/post');
class PostService extends ServiceMaster {
    constructor(model, settings) {
        super(model, settings);
    }
}

const postService = new PostService(postModel, postSettings);

module.exports = postService;