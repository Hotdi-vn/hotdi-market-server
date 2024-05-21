const crypto = require('crypto');


// remove all ascents, then replace space by hyphen
const normalize = (text) => {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, ' ').trim().replaceAll(' ', '-');
    //https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
}

const tokenize = (text) => {
    text = text.replaceAll('"', '').replaceAll("'", "").replace(/\s+/g, ' ').trim(); // clean the text
    const tokenArray = text.split(' ');
    const token = '"' + tokenArray.join('" "') + '"';
    return token;
}

const hashText = (text) => {
    const hash = crypto.createHash('sha256');
    hash.update(text);
    return hash.digest('hex');
};

const singularize = (text) => {
    if (text.endsWith('ies')) {
        return text.replace(/ies$/, 'y');
    }
    return text.replace(/s$/, '');
}

module.exports = {
    normalize,
    tokenize,
    hashText,
    singularize
}