const { singularize } = require('../../templates/helpers/string')
const cartModel = require('../../models/cart');

class UpdateOneHandler {
    constructor(service, options = {}) {
        this.service = service;
        this.options = options;
    }
    handler = async(request, reply) => {
        try {
            if (this.options['checkResource'] !== undefined) {
                for (let service of this.options['checkResource']) {
                    let resource_singular = singularize(service.settings.resource);
                    const object = await service.getOne(request.body[`${resource_singular}Id`])
                    if(!object){
                        console.error({ id: request.id, code: `${resource_singular.toUpperCase()}_NOT_FOUND`});
                        reply.code(400).send({ error: { id: request.id, code: `${resource_singular.toUpperCase()}_NOT_FOUND` } })
                        return;
                    }
                }
            }

            const _id = request.params._id;
            // const userId = request.user.id;
            // const sellerId = request.body.sellerId;
            let cart;

            for (let cartItem of request.body.cartItems) {
                cart = await cartModel.findOneAndUpdate(
                    { "_id": _id, 'cartItems.productId': cartItem.productId },
                    { $set: { 'cartItems.$.quantity': cartItem.quantity} },
                    { new: true }
                );
            }
            // const cart = this.model.where({'sellId': sellerId}).find({'cartItems.productId': productId});

            reply.code(200).send({ data: cart });
        } catch (error) {
            let errorCode = 'UPDATE_ONE_ERROR';
            if (error.code) {
                errorCode = error.code;
            }
            console.error({ id: request.id, code: errorCode, detail: error });
            reply.code(400).send({ error: { id: request.id, code: errorCode } })
        }
    }
}

module.exports = UpdateOneHandler;