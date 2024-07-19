const { singularize } = require('../../templates/helpers/string')
const productService = require('../../services/products');

class CreateOneHandler{
    constructor(service, options={}){
        this.service = service;
        this.options = options;
    }
    handler = async(request, reply) => {
        try{
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

            const userId = request.user.id;
            const carts = await this.service.getAll({ shopId: request.body.shopId, createdBy: userId });
            if (carts.items.length > 0) {
                const cart = carts.items[0];
                let cartItems = cart.cartItems;
                let productIndexMap = cartItems.reduce((map, item, index) => {
                    map[item.productId] = index;
                    return map;
                }, {});

                for (let cartItem of request.body.cartItems) {
                    let index = productIndexMap[cartItem.productId];
                    if (index !== undefined) {
                        cartItems[index].quantity += cartItem.quantity;
                    } else {
                        cartItems.push({
                            productId: cartItem.productId,
                            quantity: cartItem.quantity
                        })
                    }
                }

                const data = await this.service.updateOne(cart._id, { cartItems: cartItems }, userId);
                reply.code(200).send({ data: data });
                return;
            } else {
                let cartItemsMap = new Map();

                for (let cartItem of request.body.cartItems) {
                    if (cartItemsMap.has(cartItem.productId)) {
                        cartItemsMap.set(cartItem.productId, cartItemsMap.get(cartItem.productId) + cartItem.quantity);
                    } else {
                        cartItemsMap.set(cartItem.productId, cartItem.quantity);
                    }
                }
                
                let cartItems = Array.from(cartItemsMap, ([productId, quantity]) => ({ productId, quantity })); 
                const data = await this.service.createOne({
                    shopId: request.body.shopId,
                    cartItems: cartItems,
                    createdBy: userId
                }, userId);
                reply.code(200).send({ data: data });
            }
        } catch (error) {
            const errorCode = error.code || 'CREATE_ONE_ERROR';
            console.error({ id: request.id, code: errorCode, detail: error });
            reply.code(400).send({ error: { id: request.id, code: errorCode } })
        }
    }
}

module.exports = CreateOneHandler;