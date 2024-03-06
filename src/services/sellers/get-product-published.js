const productModel = require('../../models/product');
const getProductPublished = async (filters={}, sort={}, search='', skip=0, limit=0) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(`filters: ${JSON.stringify(filters)}`)  // xongxoa
            let item = productModel.where(filters);
            if (search.length > 0) {
                item.where({ $text: { $search: search } });
            }
            const clonedQuery = item.clone();
            const items = await item.find().sort(sort).skip(skip).limit(limit);
            const total = await clonedQuery.countDocuments();
            resolve({ items, total });
        } catch (error) {
            reject(error);
        }
    });
}
module.exports = getProductPublished;