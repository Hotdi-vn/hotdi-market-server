const cartModel = require('../../models/cart');

class DeleteProductHandler {
    constructor(service) {
        this.service = service;
    }
    handler = async(request, reply) => {
        try {
            const userId = request.user.id;
            const cartsToUpdate = await cartModel.find({ createdBy: userId, 'cartItems.productId': { $in: request.body.productIds } });
            const cartIdsToUpdate = cartsToUpdate.map(cart => cart._id);
            await cartModel.updateMany(
                { _id: { $in: cartIdsToUpdate } },
                { $pull: { cartItems: { productId: { $in: request.body.productIds } } } }
            );
            const updatedCarts = await cartModel.find({ _id: { $in: cartIdsToUpdate } });
            for (let cart of updatedCarts) {
                if (cart.cartItems.length === 0) {
                    await cartModel.deleteOne({ _id: cart._id });
                }
            }
            reply.code(200).send({ data: "Deleted all productIds in cart successfully." });
        } catch (error) {
            let errorCode = 'DELETE_CART_ERROR';
            if (error.code) {
                errorCode = error.code;
            }
            console.error({ id: request.id, code: errorCode, detail: error });
            reply.code(400).send({ error: { id: request.id, code: errorCode } })
        }

    }
}
module.exports = DeleteProductHandler;