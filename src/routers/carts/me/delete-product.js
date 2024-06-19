class DeleteProductRouter {
    constructor(settings, handler, authorization = false) {
        this.settings = settings;
        this.handler = handler;
        this.authorization = authorization;
    }
    routes = async(fastify, options) => {
        const deleteProductSchema = {
            description: 'delete multiple products',
            tags: [this.settings.resource.toUpperCase()],
            params: {
                type: 'object',
                properties: {}
            },
            body: {
                type: 'object',
                properties: {
                    productIds: {
                        type: 'array',
                        items: {
                            type: 'string'
                        }
                    }
                },
                required: ['productIds']
            },
            headers: {
                type: 'object',
                properties: {
                    'authorization': { type: 'string' }
                },
                required: ['authorization']
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'string'
                        }
                    },
                },
                400: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                code: { type: 'string' }
                            }
                        }

                    },
                }
            }
        }
        const decoration = { schema: deleteProductSchema }
        decoration.onRequest = [async(request, reply) => await fastify.authenticate(request, reply)]
        if (this.authorization) {
            decoration.onRequest.push(async(request, reply) => await fastify.authorize(request, reply, this.settings.resource, 'delete'))
        }
        fastify.delete(`/v1/${this.settings.resource}/me`, { onRequest: [async (request, reply) => await fastify.authenticate(request, reply)], schema: deleteProductSchema }, this.handler.deleteProduct);
    }
}
module.exports = DeleteProductRouter;