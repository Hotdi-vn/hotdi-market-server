class GetMyShopRouter {
    constructor(settings, handler, authentication = false) {
        this.settings = settings;
        this.handler = handler;
        this.authentication = authentication;
    }
    routes = async(fastify, options) => {
        const getMyShopSchema = {
            description: 'get my shop',
            tags: [this.settings.resource.toUpperCase()],
            headers: {
                type: 'object',
                properties: {
                    'authorization': { type: 'string' }
                },
                required: ['authorization']
            },
            querystring: (this.settings.populate && this.settings.populate.length > 0) ? {
                type: 'object',
                properties: {
                    populate: {
                        type: 'string',
                        enum: this.settings.populate
                    }
                }
            } : {},
            response: {
                200: {
                    type: 'object',
                    properties: {
                        data: this.settings.getViewSchema()
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
                            },
                            additionalProperties: true
                        }

                    },
                }
            }
        }
        const decoration = { schema: getMyShopSchema }
        decoration.onRequest = [async (request, reply) => await fastify.authenticate(request, reply)]
        fastify.get(`/v1/${this.settings.resource}/me`, decoration, this.handler.getMyShop);
    }
}

module.exports = GetMyShopRouter;