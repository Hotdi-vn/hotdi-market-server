class GetFromIdListRouter {
    constructor(settings, handler, authentication = false) {
        this.settings = settings;
        this.handler = handler;
        this.authentication = authentication;
    }
    routes = async (fastify, options) => {
        const getAllSchema = {
            description: 'get all',
            tags: [this.settings.resource.toUpperCase()],
            params: {
                type: 'object',
                properties: {
                    idList: {
                        type: 'string',
                        description: 'id list, separated by comma'
                    }
                },
                required: ['idList']
            },
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
                        data: {
                            type: 'array',
                            items: this.settings.getViewSchema()
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
        const decoration = { schema: getAllSchema }
        if (this.authentication) {
            decoration.onRequest = [async (request, reply) => await fastify.authenticate(request, reply)]
        }
        fastify.get(`/v1/${this.settings.resource}/ids/:idList`, decoration, this.handler.getFromIdList);
    }
}

module.exports = GetFromIdListRouter;