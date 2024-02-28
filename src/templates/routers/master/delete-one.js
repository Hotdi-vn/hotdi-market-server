class DeleteOneRouter {
    constructor(settings, handler, authorization = false) {
        this.settings = settings;
        this.handler = handler;
        this.authorization = authorization;
    }
    routes = async(fastify, options) => {
        const deleteOneSchema = {
            description: 'delete one',
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
        const decoration = { schema: deleteOneSchema }
        decoration.onRequest = [async(request, reply) => await fastify.authenticate(request, reply)]
        if (this.authorization) {
            decoration.onRequest.push(async(request, reply) => await fastify.authorize(request, reply, this.settings.resource, 'delete'))
        }
        fastify.delete(`/v1/${this.settings.resource}/:_id`, { onRequest: [async (request, reply) => await fastify.authenticate(request, reply)], schema: deleteOneSchema }, this.handler.deleteOne);
    }
}
module.exports = DeleteOneRouter;