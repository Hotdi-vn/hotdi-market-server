const postService = require('../../services/posts');
const HandlerMaster = require('../../templates/handlers/master');
class PostHandler extends HandlerMaster {
    constructor(service) {
        super(service);
    }
}

const postHandler = new PostHandler(postService);

postHandler.registerGetAll();
postHandler.registerCreateOne();
postHandler.registerGetOne();
postHandler.registerUpdateOne();
postHandler.registerDeleteOne();

module.exports = postHandler.getHandlers();