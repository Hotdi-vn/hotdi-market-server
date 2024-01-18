const mongoose = require('mongoose');
const { generateRandomNumber } = require("./number");
const { v4: uuidv4 } = require('uuid');
const {compressUUID} = require('./uuid');

const generateRandomNumberId = async (collectionName, length) => {

  let maxAttempt = 10;
  let count = 0; 
  while (count < maxAttempt){
    count += 1;
    try {
      let _id = generateRandomNumber(length);
      let result = await mongoose.connection.collection(collectionName).insertOne({_id:_id.toString()});
      console.log(count, result);
      return _id;
    } catch (error) {
      // do nothing
      console.log(error);
    }
  }
  try {
    let _id = compressUUID(uuidv4());
    await mongoose.connection.collection(collectionName).insertOne({_id});
    return _id;
  } catch (error) {
    // do nothing
    console.log(error);
    throw error;
  }
}


module.exports = { generateRandomNumberId }
