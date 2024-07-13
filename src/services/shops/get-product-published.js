const productModel = require('../../models/product');
const getProductPublished = async (filters={}, sort={}, search='', skip=0, limit=0) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = productModel.where(filters);
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
module.exports = getProductPublished;