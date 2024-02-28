const hasRight = (data, filters) => {
    //console.log(data, filters);
    if (!filters) {
        return false;
    }
    
    for (const key in filters) {
        if (data[key] != filters[key]) {
            return false;
        }
    }
    return true;
}

module.exports = hasRight;