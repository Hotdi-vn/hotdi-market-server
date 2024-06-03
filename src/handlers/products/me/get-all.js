class GetAllHandler {
  constructor(service, options = {}) {
    this.service = service;
    this.options = options;
  }
  handler = async (request, reply) => {
    try {
      const userId = request.user.id;
      const filters = {};
      const search = "";
      let skip = 0;
      let limit = 20;
      if (request.query.skip !== undefined) {
        skip = parseInt(request.query.skip);
      }
      if (request.query.limit !== undefined) {
        limit = parseInt(request.query.limit);
      }
      filters["createdBy"] = userId;
      this.service.settings.extractFilterDataFromSender(filters, request.query);
      let sortBy = "updatedAt";
      if (request.query.sortBy) {
        sortBy = request.query.sortBy;
      }
      let sortType = -1;
      if (request.query.sortType) {
        sortType = request.query.sortType;
      }
      const sort = {};
      sort[sortBy] = sortType;
      let populate = "";
      if (request.query.populate) {
        populate = request.query.populate;
      }
      //console.log({ filters, sort, search, skip, limit, populate });
      const data = await this.service.getAll(
        filters,
        sort,
        search,
        skip,
        limit,
        populate
      );
      reply
        .code(200)
        .send({ data: data.items, skip, limit, total: data.total });
    } catch (error) {
      let errorCode = "GET_ALL_ERROR";
      if (error.code) {
        errorCode = error.code;
      }
      console.error({ id: request.id, code: errorCode, detail: error });
      reply.code(400).send({ error: { id: request.id, code: errorCode } });
    }
  };
}

module.exports = GetAllHandler;
