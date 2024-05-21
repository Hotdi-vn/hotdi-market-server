const cartService = require('../../services/carts');
const cartModel = require('../../models/cart');

const createCartIfNotExist = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cart = await cartModel.where({ createdBy: { $eq: userId } });
            if (!cart || cart.length === 0) {
                cart = await cartService.createOne({},userId);
            } else {
                cart = cart[0];
            }
            resolve(cart);
        } catch (error) {
            reject(error);
        }
    });
}
module.exports = createCartIfNotExist;