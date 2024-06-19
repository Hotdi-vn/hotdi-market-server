class UpdateOneRouter {
    constructor(settings, handler, authorization=false) {
        this.settings = settings;
        this.handler = handler;
        this.authorization = authorization;
    }
    routes = async(fastify, options) => {
        const updateOneSchema = {
            description: 'update one',
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
            querystring: (this.settings.populate && this.settings.populate.length > 0) ? {
                type: 'object',
                properties: {
                    populate: {
                        type: 'string',
                        enum: this.settings.populate
                    }
                }
            } : {},
            body: this.settings.getUpdateSchema(),
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
        const decoration = { schema: updateOneSchema }
        decoration.onRequest = [async (request, reply) => await fastify.authenticate(request, reply)]
        if (this.authorization) {
            decoration.onRequest.push(async(request, reply) => await fastify.authorize(request, reply,this.settings.resource,'update'))
        }
        fastify.put(`/v1/${this.settings.resource}/:_id`, decoration, this.handler.updateOne);
    }
}

module.exports = UpdateOneRouter;