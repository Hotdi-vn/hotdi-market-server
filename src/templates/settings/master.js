const { v4: uuidv4 } = require('uuid');
class Settings {
    constructor() {
        this.resource = "masters";
        this.settings = {};
        this.ancentorsEnabled = false;
        this.populate = [];
        this.excludesEnabled = false;
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
             // moved required to service updateOne
            // if (this.settings[key].required) {
            //     required.push(key);
            // }
        }
        return { type: 'object', properties, required }
    }

    getFilterSchema = (excludedKeys=[]) => {
        const properties = {};
        const required = []
        for (const key in this.settings) {
            if (this.settings[key].filter && excludedKeys.indexOf(key) == -1) {
                properties[key] = this.settings[key].schema;
            }
        }
        const sortEnum = [];
        for (const key in this.settings) {
            if (this.settings[key].sort) {
                sortEnum.push(key);
            }
        }
        if (sortEnum.length > 0) {
            properties.sortBy = { type: 'string', enum: sortEnum };
            properties.sortType = { type: 'number', enum: [-1, 1] };
        }
        if (this.populate && this.populate.length > 0) {
            properties.populate = {
                    type: 'string',
                    enum: this.populate
            }
        }
        if (this.excludeEnabled) {
            properties.exclude = {
                type: 'array',
                items: {
                    type: 'string'
                }
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
                    if (this.settings[key].model.type != Array) {
                        object[key] = sender[key];
                    } else {
                        if (Array.isArray(sender[key])) {
                            if (object[key] == undefined) {
                                object[key] = [];
                            }
                            for (const item of sender[key]) {
                                if (object[key].indexOf(item) == -1) {
                                    object[key].push(item);
                                }
                            }
                        }
                    }
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
            if (this.settings[key].model) {
                properties[key] = this.settings[key].model;
            }
        }
        return properties
    }
}

module.exports = Settings
