"use strict";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: `${__dirname}/../.env.development` });
} else {
  require("dotenv").config({ path: `${__dirname}/../.env.production` });
}

const { v4: uuidv4 } = require("uuid");

// Require the framework and instantiate it
const Fastify = require("fastify")
const fastify = Fastify({
  logger: true,
  genReqId: function (req) {
    return uuidv4();
  },
});

fastify.register(require("@fastify/cors"), {
  // put your options here
});
const jwt = require("jsonwebtoken");
const fs = require("fs");
fastify.decorate("authenticate", async function (request, reply) {
  const authorization = request.headers.authorization;
  if (!authorization) {
    reply.code(401).send("Unauthorized");
    return;
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    reply.code(401).send("Unauthorized");
    return;
  }

  try {
    const publicKey = fs.readFileSync("src/certs/public.key");
    request.user = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
  } catch (err) {
    //console.error(err);
    reply.code(401).send("Unauthorized");
    return;
  }
});

const permissionService = require("./services/permissions");
fastify.decorate(
  "authorize",
  async function (request, reply, resource, action) {
    //return true;
    // action: create, read, update, delete
    // resource: post

    const userId = request.user.id;
    if (!userId) {
      reply.code(401).send("Unauthorized");
      return;
    }

    const permission = await permissionService.getPermission(
      userId,
      resource,
      action
    );
    console.log(permission);
    if (permission) {
      request.permission = permission; // for use in route handler to check if permission is allowed on specific resource (filters applied using permissionService.hasRight)
      return;
    }

    // denied
    reply.code(401).send("Permission denied");
  }
);

fastify.setErrorHandler(function (error, request, reply) {
  if (error.validation) {
    let error_payload = { id: request.id, code: error.code, statusCode: error.statusCode, message: error.message }
    reply.status(400).send({ error: error_payload })
  } else {
    reply.send(error)
  }
})

require("./templates/config/mongoose"); // run at require
const File = require("./models/file.js"); // Assuming file.js is the file where your model is defined
const { checkExistOrCreate } = require("./templates/helpers/db-helper");
checkExistOrCreate(File);

fastify.register(require("@fastify/swagger"), {
  swagger: {
    info: {
      title: "Market server swagger",
      description: "MARKET API",
      version: process.env.VERSION,
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    hosts: [process.env.PUBLIC_HOSTNAME],
    basePath: process.env.PUBLIC_BASE_PATH,
    schemes: [process.env.PUBLIC_PROTOCOL],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [],
    definitions: {},
  },
  securityDefinitions: {},
});

fastify.register(require("@fastify/swagger-ui"), {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

fastify.register(require("./routers/sellers"));
fastify.register(require("./routers/categories"));
fastify.register(require("./routers/carts"));
fastify.register(require("./routers/products"));
fastify.register(require("./routers/banners"));
fastify.register(require("./routers/permissions"));
fastify.register(require("./routers/roles"));

// Declare a route
fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

fastify.get("/healthcheck", function (request, reply) {
  reply.send("OK");
});

// Run the server!
const port = process.env.PORT || 3000;
fastify.listen({ port, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
