class Routers {
    constructor(settings, handler) {
        this.settings = settings;
        this.handler = handler;
        this.routers = [];
    }
    routes = async(fastify, options) => {
        for (let router of this.routers) {
            fastify.register(router);
        }
    }
    register(router) {
        this.routers.push(router);
    }
    registerGetAll(authentication=false) {
        const GetAllRouter = require('./get-all');
        const getAllRouter = new GetAllRouter(this.settings, this.handler, authentication);
        this.register(getAllRouter.routes);
    }
    registerGetFromIdList(authentication=false) {
        const GetFromIdListRouter = require('./get-from-id-list');
        const getFromIdListRouter = new GetFromIdListRouter(this.settings, this.handler, authentication);
        this.register(getFromIdListRouter.routes);
    }
    registerCreateOne(authorization=false) {
        const CreateOneRouter = require('./create-one');
        const createOneRouter = new CreateOneRouter(this.settings, this.handler, authorization);
        this.register(createOneRouter.routes);
    }
    registerGetOne() {
        const GetOneRouter = require('./get-one');
        const getOneRouter = new GetOneRouter(this.settings, this.handler);
        this.register(getOneRouter.routes);
    }
    registerUpdateOne(authorization=false) {
        const UpdateOneRouter = require('./update-one');
        const updateOneRouter = new UpdateOneRouter(this.settings, this.handler, authorization);
        this.register(updateOneRouter.routes);
    }
    registerDeleteOne(authorization=false) {
        const DeleteOneRouter = require('./delete-one');
        const deleteOneRouter = new DeleteOneRouter(this.settings, this.handler, authorization);
        this.register(deleteOneRouter.routes);
    }
}
module.exports = Routers;