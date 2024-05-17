class Handlers {
    constructor(service) {
        this.service = service;
        this.handlers = {};
    }

    register(name, handler) {
        this.handlers[name] = handler;
    }

    getHandler(name) {
        return this.handlers[name];
    }
    getHandlers() {
        return this.handlers;
    }
    registerGetMyAll(options={}) {
        const GetMyAllHandler = require('./get-my-all');
        const getMyAllHandler = new GetMyAllHandler(this.service, options);
        this.register('getMyAll', getMyAllHandler.handler);
    }
    registerGetAll(options={}) {
        const GetAllHandler = require('./get-all');
        const getAllHandler = new GetAllHandler(this.service, options);
        this.register('getAll', getAllHandler.handler);
    }
    registerGetFromIdList(options={}) {
        const GetFromIdListHandler = require('./get-from-id-list');
        const getFromIdListHandler = new GetFromIdListHandler(this.service, options);
        this.register('getFromIdList', getFromIdListHandler.handler);
    }
    registerCreateOne(options={}) {
        const CreateOneHandler = require('./create-one');
        const createOneHandler = new CreateOneHandler(this.service, options);
        this.register('createOne', createOneHandler.handler);
    }
    registerGetOne() {
        const GetOneHandler = require('./get-one');
        const getOneHandler = new GetOneHandler(this.service);
        this.register('getOne', getOneHandler.handler);
    }
    registerUpdateOne(options={}) {
        const UpdateOneHandler = require('./update-one');
        const updateOneHandler = new UpdateOneHandler(this.service, options);
        this.register('updateOne', updateOneHandler.handler);
    }
    registerDeleteOne() {
        const DeleteOneHandler = require('./delete-one');
        const deleteOneHandler = new DeleteOneHandler(this.service);
        this.register('deleteOne', deleteOneHandler.handler);
    }
    
}
module.exports = Handlers;