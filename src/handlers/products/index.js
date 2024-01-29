const productService = require('../../services/products');

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
        const GetAllHandler = require('../../templates/handlers/master/get-all');
        const getAllHandler = new GetAllHandler(this.service, options);
        this.register('getAll', getAllHandler.handler);
    }
    registerGetFromIdList(options={}) {
        const GetFromIdListHandler = require('../../templates/handlers/master/get-from-id-list');
        const getFromIdListHandler = new GetFromIdListHandler(this.service, options);
        this.register('getFromIdList', getFromIdListHandler.handler);
    }
    registerCreateOne() {
        const CreateOneHandler = require('./create-one');
        const createOneHandler = new CreateOneHandler(this.service);
        this.register('createOne', createOneHandler.handler);
    }
    registerGetOne() {
        const GetOneHandler = require('../../templates/handlers/master/get-one');
        const getOneHandler = new GetOneHandler(this.service);
        this.register('getOne', getOneHandler.handler);
    }
    registerUpdateOne() {
        const UpdateOneHandler = require('./update-one');
        const updateOneHandler = new UpdateOneHandler(this.service);
        this.register('updateOne', updateOneHandler.handler);
    }
    registerDeleteOne() {
        const DeleteOneHandler = require('../../templates/handlers/master/delete-one');
        const deleteOneHandler = new DeleteOneHandler(this.service);
        this.register('deleteOne', deleteOneHandler.handler);
    }
    
}

class ProductHandler extends Handlers {
    constructor(service) {
        super(service);
    }
}

const productHandler = new ProductHandler(productService);

productHandler.registerGetAll();
productHandler.registerCreateOne();
productHandler.registerGetOne();
productHandler.registerUpdateOne();
productHandler.registerDeleteOne();

module.exports = productHandler.getHandlers();