const locationHandler = require('../../handlers/locations');

//https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/

async function routes(fastify, options) {

  const locationType = {
    code: {type: 'string'},
    name: {type: 'string'},
    parent: {type: 'string'}
  }
  //////////////////////////////////////////////
  const locationSchema = {
    description: 'get location by code',
    tags: ['LOCATION'],
    params: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
        }
      }
    },
    response: {
      200: {
        type: 'object',
        properties:{
          data: {
            type: 'object',
            properties: locationType
          }
        } 
      }
    }
  }
  fastify.get('/v1/locations/:code', {schema: locationSchema}, locationHandler.getLocation);

  ////////////////////////////////////////////
  const subLocationSchema = {
    description: 'get location by parent code',
    tags: ['LOCATION'],
    params: {
      type: 'object',
      properties: {
        parentCode: {
          type: 'string',
          description: ' 0 for all provinces'
        }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type:'object',
              properties: locationType
            }
          }
        }
       
      }
    }
  }
  fastify.get('/v1/locations/parent/:parentCode', {schema: subLocationSchema},locationHandler.getSubLocation);

  /////////////////////////////////////////////////////////
  const countryType = {
    code: {type:'string'},
    name: {type:'string'}
  }
  const countrySchema = {
    description: 'get country by code',
    tags: ['LOCATION'],
    params: {
      type: 'object',
      properties: {
        code: {
          type: 'string'
        }
      }
    },
    response: {
      200: {
        type: 'object',
        properties:{
          data: {
            type: 'object',
            properties: countryType
          }
        } 
      }
    }
  }
  fastify.get('/v1/countries/:code', {schema: countrySchema}, locationHandler.getOneCountry);

  const countryListSchema = {
    description: 'get all countries',
    tags: ['LOCATION'],
    response: {
      200: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type:'object',
              properties: countryType
            }
          }
        }
      }
    }
  }
  fastify.get('/v1/countries', {schema: countryListSchema}, locationHandler.getAllCountries);

}
module.exports = routes