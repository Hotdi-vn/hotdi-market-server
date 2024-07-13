class UpdateMyOneRouter {
    constructor(settings, handler, authorization=false) {
        this.settings = settings;
        this.handler = handler;
        this.authorization = authorization;
    }
    routes = async(fastify, options) => {
        const updateMyOneSchema = {
            description: 'update my shop',
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
                            },
                            additionalProperties: true
                        }

                    },
                }
            }
        }
        const decoration = { schema: updateMyOneSchema }
        decoration.onRequest = [async (request, reply) => await fastify.authenticate(request, reply)]
        if (this.authorization) {
            decoration.onRequest.push(async(request, reply) => await fastify.authorize(request, reply,this.settings.resource,'create'))
        }
        fastify.put(`/v1/${this.settings.resource}/me`, decoration, this.handler.updateMyOne);
    }
}
module.exports = UpdateMyOneRouter;