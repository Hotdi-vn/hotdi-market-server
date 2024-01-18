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
    registerCreateOne() {
        const CreateOneHandler = require('./create-one');
        const createOneHandler = new CreateOneHandler(this.service);
        this.register('createOne', createOneHandler.handler);
    }
    registerGetOne() {
        const GetOneHandler = require('./get-one');
        const getOneHandler = new GetOneHandler(this.service);
        this.register('getOne', getOneHandler.handler);
    }
    registerUpdateOne() {
        const UpdateOneHandler = require('./update-one');
        const updateOneHandler = new UpdateOneHandler(this.service);
        this.register('updateOne', updateOneHandler.handler);
    }
    registerDeleteOne() {
        const DeleteOneHandler = require('./delete-one');
        const deleteOneHandler = new DeleteOneHandler(this.service);
        this.register('deleteOne', deleteOneHandler.handler);
    }
    
}
module.exports = Handlers;