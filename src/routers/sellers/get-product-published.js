const { getSchema } = require('../../templates/helpers/db-helper')
const productSettings = require('../../settings/product');
class GetProductPublishedRouter {
    constructor(settings, handler, authorization=false) {
        this.settings = settings;
        this.handler = handler;
        this.authorization = authorization;
    }
    routes = async(fastify, options) => {
        const getProductPublishedSchema = {
            description: 'seller get all products with filter: Published = "Đang đăng bán"',
            tags: [this.settings.resource.toUpperCase()],
            params: {
                type: 'object',
                properties: {
                    sellerId: {
                        type: 'string',
                    }
                },
                required: ['sellerId']
            },
          
            queryString: this.settings.getFilterSchema(),
            response: {
                200: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'array',
                            items: getSchema(productSettings.settings)
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
        const decoration = { schema: getProductPublishedSchema }
        // decoration.onRequest = [async (request, reply) => await fastify.authenticate(request, reply)]
        // if (this.authorization) {
        //     decoration.onRequest.push(async(request, reply) => await fastify.authorize(request, reply,this.settings.resource, 'read'))
        // }
        fastify.post(`/v1/${this.settings.resource}/:sellerId/products`, decoration, this.handler.getProductPublished);
    }
}

module.exports = GetProductPublishedRouter;