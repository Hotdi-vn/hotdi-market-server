function generateRandomNumber(length) {
  const min = Math.pow(10, length-1);
  const max = Math.pow(10, length)-min;
  return Math.floor(Math.random() * max) + min;
}
module.exports = {generateRandomNumber}