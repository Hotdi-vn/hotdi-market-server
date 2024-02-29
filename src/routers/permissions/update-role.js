class UpdateOneRouter {
    constructor(settings, handler, authorization=false) {
        this.settings = settings;
        this.handler = handler;
        this.authorization = authorization;
    }
    routes = async(fastify, options) => {
        const updateOneSchema = {
            description: 'update role',
            tags: [this.settings.resource.toUpperCase()],
            params: {
                type: 'object',
                properties: {
                    role: {
                        type: 'string',
                        enum: ['buyer', 'seller']
                    }
                },
                required: ['role']
            },
            headers: {
                type: 'object',
                properties: {
                    'authorization': { type: 'string' }
                },
                required: ['authorization']
            },
            //body: this.settings.getUpdateSchema(),
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
        fastify.post(`/v1/${this.settings.resource}/me/:role`, decoration, this.handler.updateRole);
    }
}

module.exports = UpdateOneRouter;