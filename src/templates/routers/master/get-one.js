class GetOneRouter {
    constructor(settings, handler, authentication = false) {
        this.settings = settings;
        this.handler = handler;
        this.authentication = authentication;
    }
    routes = async (fastify, options) => {
        const getOneSchema = {
            description: 'get one',
            tags: [this.settings.resource.toUpperCase()],
            params: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string'
                    }
                },
                required: ['_id']
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
            headers: (this.authentication ? {
                type: 'object',
                properties: {
                    'authorization': { type: 'string' }
                },
                required: ['authorization']
            } : {}),
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
                            }
                        }

                    },
                }
            }
        }
        const decoration = { schema: getOneSchema }
        if (this.authentication) {
            decoration.onRequest = [async (request, reply) => await fastify.authenticate(request, reply)]
        }
        fastify.get(`/v1/${this.settings.resource}/:_id`, decoration, this.handler.getOne);
    }
}

module.exports = GetOneRouter;