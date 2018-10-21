// args.apiDoc needs to be a js object.  This file could be a json file,
// but we can't add comments in json files.
module.exports = {
  swagger: '2.0',
  // host: "localhost",
  // all routes will now have /v3 prefixed.
  basePath: '/v3',
  schemes: ['http'],

  info: {
    title: 'express-openapi project',
    version: '3.0.0',
  },

  definitions: {
    Error: {
      additionalProperties: true,
    },
    User: {
      properties: {
        name: {
          type: 'string',
        },
        phone: {
          type: 'string',
        },
      },
      required: ['name', 'phone'],
    },
    Phonebook: {
      properties: {
        title: {
          type: 'string',
        },
        items: {
          type: 'array',
          items: {
            $ref: '#/definitions/User',
          },
        },
      },
      required: ['title', 'items'],
    },
  },
  // paths are derived from args.routes.  These are filled in by fs-routes.
  paths: {},
};
