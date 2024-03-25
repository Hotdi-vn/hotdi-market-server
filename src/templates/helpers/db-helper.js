function getSchema(settings, extraProperties = {}) {
    const properties = {};
    for (const key in settings) {
        if (!settings[key].hidden) {
            properties[key] = settings[key].schema;
        }
    }
    return { type: 'object', properties: { ...properties, ...extraProperties } };
}


module.exports = {
    getSchema,
}