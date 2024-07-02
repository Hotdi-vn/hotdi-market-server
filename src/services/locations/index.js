if (global.locationList == null){
  global.locationList = require('../../data/provinces/location-data.json');
}

if (global.countryList == null){
  global.countryList = require('../../data/countries.json');
}

const getLocation = (code) => {
  const result = global.locationList.filter(item => item.code==code);
  if (result && result.length > 0) {
    return result[0];
  }
  return {error: 'LOCATION_NOT_FOUND'};
}

const getSubLocation = (parentCode) => {
  // if (parentCode == '-1') {
  //   return global.locationList;// tỉnh thành + quận huyện
  // }
  const result = global.locationList.filter(item => item.parent==parentCode);
  return result;
}

const getOneCountry = (code)=>{
  const result = global.countryList.filter(item => item.code==code);
  if (result && result.length > 0) {
    return result[0];
  }
  return {error: 'COUNTRY_NOT_FOUND'};
}

const getAllCountries = ()=>{
  return global.countryList;
}

module.exports = {getLocation, getSubLocation, getOneCountry, getAllCountries}