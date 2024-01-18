const hex = "0123456789abcdef";
//const base90 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&'()*+-./:<=>?@[]^_`{|}~";
const base90 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Convers a Base16 (Hex) represented string to a Base 90 String.
 * @param {String} number Hex represented string
 * @returns A Base90 representation of the hex string
 */
function convertToBase90(number) {
  var i,
    divide,
    newlen,
    numberMap = {},
    fromBase = hex.length,
    toBase = base90.length,
    length = number.length,
    result = typeof number === "string" ? "" : [];

  for (i = 0; i < length; i++) {
    numberMap[i] = hex.indexOf(number[i]);
  }
  do {
    divide = 0;
    newlen = 0;
    for (i = 0; i < length; i++) {
      divide = divide * fromBase + numberMap[i];
      if (divide >= toBase) {
        numberMap[newlen++] = parseInt(divide / toBase, 10);
        divide = divide % toBase;
      } else if (newlen > 0) {
        numberMap[newlen++] = 0;
      }
    }
    length = newlen;
    result = base90.slice(divide, divide + 1).concat(result);
  } while (newlen !== 0);

  return result;
}

/**
 * Compresses a UUID String to base 90 resulting in a shorter UUID String
 * @param {String} uuid The UUID string to compress
 * @returns A compressed UUID String.
 */
function compressUUID(uuid) {
  uuid = uuid.replace(/-/g, "");
  return convertToBase90(uuid);
}

module.exports = { compressUUID };