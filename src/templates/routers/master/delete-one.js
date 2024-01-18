class DeleteOneRouter {
    constructor(settings, handler) {
        this.settings = settings;
        this.handler = handler;
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
        fastify.delete(`/v1/${this.settings.resource}/:_id`, { onRequest: [async (request, reply) => await fastify.authenticate(request, reply)], schema: deleteOneSchema }, this.handler.deleteOne);
    }
}
module.exports = DeleteOneRouter;