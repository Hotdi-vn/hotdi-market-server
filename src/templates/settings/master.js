const { v4: uuidv4 } = require('uuid');
class Settings {
    constructor() {
        this.resource = "masters";
        this.settings = {};
    }
    generateId = () => {
        return uuidv4();
    }
    getInsertSchema = () => {
        const properties = {};
        const required = []
        for (const key in this.settings) {
            if (this.settings[key].insert) {
                properties[key] = this.settings[key].schema;
            }
            if (this.settings[key].required) {
                required.push(key);
            }
        }
        return { type: 'object', properties, required }
    }


    getViewSchema = (extraProperties = {}) => {
        const properties = {};
        for (const key in this.settings) {
            if (!this.settings[key].hidden) {
                properties[key] = this.settings[key].schema;
            }
        }
        return { type: 'object', properties: { ...properties, ...extraProperties } };
    }


    getUpdateSchema = () => {
        const properties = {};
        const required = []
        for (const key in this.settings) {
            if (this.settings[key].update) {
                properties[key] = this.settings[key].schema;
            }
            if (this.settings[key].required) {
                required.push(key);
            }
        }
        return { type: 'object', properties, required }
    }

    getFilterSchema = () => {
        const properties = {};
        const required = []
        for (const key in this.settings) {
            if (this.settings[key].filter) {
                properties[key] = this.settings[key].schema;
            }
        }
        properties.skip = { type: 'number', minimum: 0 };
        properties.limit = { type: 'number', maximum: 20 };
        return { type: 'object', properties, required }
    }

    getSchema = (key) => {
        return this.settings[key].schema;
    }

    extractUpdateDataFromSender = (object, sender) => {
        if (sender == null || sender == undefined) {
            return object;
        }
        for (const key in this.settings) {
            if (this.settings[key].update) {
                if (sender[key] != null && sender[key] != undefined) {
                    object[key] = sender[key];
                }
            }
        }
        return object;
    }



    extractInsertDataFromSender = (object, sender) => {
        if (sender == null || sender == undefined) {
            return object;
        }
        for (const key in this.settings) {
            if (this.settings[key].insert) {
                if (sender[key] != null && sender[key] != undefined) {
                    object[key] = sender[key];
                }
            }
        }
        return object;
    }

    extractFilterDataFromSender = (object, sender) => {
        if (sender == null || sender == undefined) {
            return object;
        }
        for (const key in this.settings) {
            if (this.settings[key].filter) {
                if (sender[key] != "" && sender[key] != null && sender[key] != undefined) {
                    object[key] = sender[key];
                }
            }
        }
        return object;
    }

    getMongooseSchema = () => {
        const properties = {};
        for (const key in this.settings) {
            properties[key] = this.settings[key].model;
        }
        return properties
    }
}

module.exports = Settings