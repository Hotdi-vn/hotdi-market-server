const stringHelper = require('../../helpers/string');

class Service {
    constructor(model, settings) {
        this.model = model;
        this.settings = settings;
    }
    register = (name, func) => {
        this[name] = func;
    }
    getOne = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const item = await this.model.findById(id);
                if (item) {
                    resolve(item);
                } else {
                    reject({ code: 'ITEM_NOT_FOUND' });
                }
            } catch (error) {
                reject(error);
            }
        });
    }
    getAll = async (filters={}, sort={}, search='', skip=0, limit=0) => {
        return new Promise(async (resolve, reject) => {
            try {
                const query = this.model.where(filters);
                if (search.length > 0) {
                    query.where({ $text: { $search: search } });
                }
                const clonedQuery = query.clone();
                const items = await query.find().sort(sort).skip(skip).limit(limit);
                const total = await clonedQuery.countDocuments();
                resolve({ items, total });
            } catch (error) {
                reject(error);
            }
        });
    }
    getFromIdList = async (idList=[]) => {
        return new Promise(async (resolve, reject) => {
            try {
                const query = this.model.where({ _id: { $in: idList } });
                const items = await query.find();
                resolve({ items });
            } catch (error) {
                reject(error);
            }
        });
    }
    generateId = (item) => {
        return this.settings.generateId();
    }
    createOne = async (senderData, createdBy) => {
        return new Promise(async (resolve, reject) => {
            try {
                const item = new this.model();
                item.createdBy = createdBy;
                item.createdAt = Date.now();
                this.settings.extractInsertDataFromSender(item, senderData);
                if (item._id == null) {
                    item._id = this.generateId(item);
                } 
                const newItem = await item.save();
                resolve(newItem);
            } catch (error) {
                reject(error);
            }
        });
    }
    updateOne = async (_id, senderData, requesterId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const item = await this.model.findById(_id);
                //console.log(item);
                //if (!item || item.createdBy != requesterId) {
                if (!item) {
                    reject({ code: 'ITEM_NOT_FOUND' });
                    return;
                }
                this.settings.extractUpdateDataFromSender(item, senderData);
                item.updatedAt = Date.now();
                item.updatedBy = requesterId;
                //console.log(post);
                const newItem = await item.save();
                resolve(newItem);
            } catch (error) {
                if (error.code == 11000) {
                    reject({ code: 'ITEM_CODE_DUPLICATED' });
                    return;
                }
                reject(error);
            }
        });
    }
    deleteOne = async (_id, createdBy) => {
        return new Promise(async (resolve, reject) => {
            try {
                const item = await this.model.findById(_id);
                //console.log(post);
                if (!item ) {
                    reject({ code: 'ITEM_NOT_FOUND' });
                    return;
                }
                await item.deleteOne();
                resolve(item);
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = Service;