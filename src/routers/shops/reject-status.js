class RejectStatusRouter {
    constructor(settings, handler, authorization=false) {
        this.settings = settings;
        this.handler = handler;
        this.authorization = authorization;
    }
    routes = async(fastify, options) => {
        const rejectStatusSchema = {
            description: 'reject shop status',
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
            body: { type: 'object', 
                properties: {
                    adminStatusComment: { type: 'string' }
                },
                required: ['adminStatusComment']
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
                            },
                            additionalProperties: true
                        }

                    },
                }
            }
        }
        const decoration = { schema: rejectStatusSchema }
        decoration.onRequest = [async (request, reply) => await fastify.authenticate(request, reply)]
        if (this.authorization) {
            decoration.onRequest.push(async(request, reply) => await fastify.authorize(request, reply,this.settings.resource,'create'))
        }
        fastify.post(`/v1/${this.settings.resource}/reject-status/:_id`, decoration, this.handler.rejectStatus);
    }
}
module.exports = RejectStatusRouter;