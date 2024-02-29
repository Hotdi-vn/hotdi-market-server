const model = require('../../models/permission');
const updateRole = async (_id, role) => {
    return new Promise(async (resolve, reject) => {
        try {
            let item = await model.findById(_id);
            //console.log(item);
            //if (!item || item.createdBy != requesterId) {
            if (!item) {
                item = new model({ _id: _id, createdBy: _id, createdAt: Date.now()});
            }
            //this.settings.extractUpdateDataFromSender(item, senderData);
            if (!item.roles) item.roles = [];
            if (item.roles.indexOf(role) == -1) {
                item.roles.push(role);
            }
            item.updatedAt = Date.now();
            item.updatedBy = _id;
            //console.log(post);
            const newItem = await item.save();
            resolve(newItem);
        } catch (error) {
            reject(error);
        }
    });
}
module.exports = updateRole;