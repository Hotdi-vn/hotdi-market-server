const locationService = require('../../services/locations');
const getLocation = async(request, reply) => {
  const code = request.params.code;
  const data = locationService.getLocation(code);
  reply.code(200).send({data})
}
const getSubLocation = async(request, reply) => {
  const parentCode = request.params.parentCode;
  const data = locationService.getSubLocation(parentCode);
  reply.code(200).send({data})
}

const getOneCountry = async(request, reply) => {
  const code = request.params.code;
  const data = locationService.getOneCountry(code);
  reply.code(200).send({data})
}

const getAllCountries = async(request, reply) => {
  const data = locationService.getAllCountries();
  reply.code(200).send({data})
}
module.exports = {getLocation,getSubLocation, getOneCountry, getAllCountries}