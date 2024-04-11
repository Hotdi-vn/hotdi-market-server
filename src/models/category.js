const mongoose = require('mongoose');
const categorySettings = require('../settings/category');

const schema = new mongoose.Schema(categorySettings.getMongooseSchema());
schema.pre('save', function () {
    // You can also return a promise that rejects
    return new Promise((resolve, reject) => {
        if (this._id == this.parent) {
            reject(new Error('parent and _id must be different'));
            return
        }
        resolve();
    });
});
schema.post('find', async function (docs) {
    return new Promise(async (resolve, reject) => {
        try {
            for (const doc of docs) {
                const children = await this.model.find({ parent: doc._id });
                //console.log(children);
                doc.isLeaf = true;
                if (children.length > 0) {
                    doc.isLeaf = false;
                    //doc.save();
                }

                //doc.save();
            }
            resolve();
        }
        catch (error) {
            reject(error);
        }

    });
});
schema.post('findOne', async function (doc) {
    return new Promise(async (resolve, reject) => {
        try {
            if (doc) {
                const children = await this.model.find({ parent: doc._id });
                doc.isLeaf = true;
                if (children.length > 0) {
                    doc.isLeaf = false;
                    //doc.save();
                }

                //doc.save();
            }
            resolve();
        }
        catch (error) {
            reject(error);
        }

    });
});
const model = mongoose.model('category', schema);

module.exports = model;