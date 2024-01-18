class GetAllRouter {
    constructor(settings, handler, authentication = false) {
        this.settings = settings;
        this.handler = handler;
        this.authentication = authentication;
    }
    routes = async (fastify, options) => {
        const getAllSchema = {
            description: 'get all',
            tags: [this.settings.resource.toUpperCase()],
            headers: (this.authentication ? {
                type: 'object',
                properties: {
                    'authorization': { type: 'string' }
                },
                required: ['authorization']
            } : {}),
            querystring: this.settings.getFilterSchema(),
            response: {
                200: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'array',
                            items: this.settings.getViewSchema()
                        },
                        skip: { type: 'number' },
                        limit: { type: 'number' },
                        total: { type: 'number' },
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
        const decoration = { schema: getAllSchema }
        if (this.authentication) {
            decoration.onRequest = [async (request, reply) => await fastify.authenticate(request, reply)]
        }
        fastify.get(`/v1/${this.settings.resource}`, decoration, this.handler.getAll);
    }
}

module.exports = GetAllRouter;