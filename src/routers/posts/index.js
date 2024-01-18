const postHandler = require('../../handlers/posts');
const postSettings = require('../../settings/post');
const RouterMaster = require('../../templates/routers/master');
class PostRouter extends RouterMaster {
    constructor(settings, handler) {
        super(settings, handler)
    }
}

const postRouter = new PostRouter(postSettings, postHandler);

postRouter.registerGetAll();
postRouter.registerCreateOne();
postRouter.registerGetOne();
postRouter.registerUpdateOne();
postRouter.registerDeleteOne();

module.exports = postRouter.routes;