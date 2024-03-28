function getSchema(settings, extraProperties = {}) {
    const properties = {};
    for (const key in settings) {
        if (!settings[key].hidden) {
            properties[key] = settings[key].schema;
        }
    }
    return { type: 'object', properties: { ...properties, ...extraProperties } };
}

// Create the collection if it doesn't exist
async function checkExistOrCreate(collection) {
    let product = await collection.exists(); 
    
    if (!product) {
        collection.createCollection().then(function (col) { 
            console.log(`Collection is created!`); 
        });
    }
}

module.exports = {
    getSchema,
    checkExistOrCreate
}