class CreateOneRouter {
    constructor(settings, handler) {
        this.settings = settings;
        this.handler = handler;
    }
    routes = async(fastify, options) => {
        const createOneSchema = {
            description: 'create one',
            tags: [this.settings.resource.toUpperCase()],
            headers: {
                type: 'object',
                properties: {
                    'authorization': { type: 'string' }
                },
                required: ['authorization']
            },
            body: this.settings.getInsertSchema(),
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
        fastify.post(`/v1/${this.settings.resource}`, { onRequest: [async (request, reply) => await fastify.authenticate(request, reply)], schema: createOneSchema }, this.handler.createOne);
    }
}
module.exports = CreateOneRouter;