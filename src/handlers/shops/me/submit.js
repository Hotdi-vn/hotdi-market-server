const { singularize } = require('../../../templates/helpers/string')
const { generateRandomNumber } = require('../../../templates/helpers/number.js')

class SubmitOneHandler{
    constructor(service, options={}){
        this.service = service;
        this.options = options;
    }
    handler = async(request, reply) => {
        try{
            if (this.options['checkResource'] !== undefined) {
                for (let service of this.options['checkResource']) {
                    let resource_singular = singularize(service.settings.resource);
                    const object = await service.getOne(request.body[`${resource_singular}Id`])
                    if(!object){
                        console.error({ id: request.id, code: `${resource_singular.toUpperCase()}_NOT_FOUND`});
                        reply.code(400).send({ error: { id: request.id, code: `${resource_singular.toUpperCase()}_NOT_FOUND` } })
                        return;
                    }
                }
            }
            delete request.body.adminStatusComment;
            
            let populate = '';
            if (request.query.populate) {
                populate = request.query.populate;
            }
            const userId = request.user.id;

            let statusData = {
                status: 'WaitingApproval',
                adminStatusUpdater: 'system',
                adminStatusComment: 'auto updated by system',
                adminStatusUpdatedAt: Date.now()
            }

            try {
                let existingItem = await this.service.getOne(userId);
                if (existingItem) {
                    var data = await this.service.updateOne(userId, request.body, userId, false, statusData);
                }
            } 
            catch (error) {
                if (error.code === 'ITEM_NOT_FOUND') {
                    let username = await this.generateUsername(request.body.name);
                    statusData.username = username;
                    var data = await this.service.createOne(request.body, userId, userId, statusData);
                } else {
                    throw error;
                }
            }

            if (request.query.populate) {
                data = await this.service.getOne(data._id, request.query.populate);
            }
            reply.code(200).send({ data: data });
        } catch (error) {
            let errorCode = 'CREATE_ONE_ERROR';
            if (error.code) {
                errorCode = error.code;
            }
            if (error.code === 11000) {
                errorCode = 'DUPLICATE_KEY_ERROR';
            }
            console.error({ id: request.id, code: errorCode, detail: error });
            reply.code(400).send({ error: { id: request.id, code: errorCode, message: error.message } })
        }
    }

    async generateUsername(shopName) {
        let baseUsername = shopName.toLowerCase().replace(/\s+/g, '');
        let username = baseUsername;
    
        while (await this.checkIfUsernameExists(username)) {
            username = `${baseUsername}_${generateRandomNumber(7)}`;
        }
    
        return username;
    }

    async checkIfUsernameExists(username) {
        let data = await this.service.getAll({ username: username })
        return data.items.length != 0;
    }
}

module.exports = SubmitOneHandler;