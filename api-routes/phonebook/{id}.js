module.exports = {
  // parameters for all operations in this path
  parameters: [
    {
      name: 'id',
      in: 'path',
      type: 'string',
      required: true,
      description: 'id'
    }
  ],
  // method handlers may just be the method handler...
  get: get,
  // or they may also be an array of middleware + the method handler.  This allows
  // for flexible middleware management.  express-openapi middleware generated from
  // the <path>.parameters + <methodHandler>.apiDoc.parameters is prepended to this
  // array.
  post: [function(req, res, next) {next();}]
};



function get(req, res) {

  console.log('qqw', req.params)
  res.status(200).json({
    id: req.params.id,
    name: req.query.name,
    age: req.query.age
  });
}

get.apiDoc = {
  description: 'Retrieve phonebook by id',
  operationId: 'getPhonebook',
  tags: ['phonebooks'],
  responses: {
    200: {
      description: "Requested user",
      schema: {
        $ref: '#/definitions/Phonebook'
      }
    },

    default: {
      description: "Unexpected error",
      schema: {
        $ref: '#/definitions/Error'
      }
    }
  }
};

module.exports.post.apiDoc = {
  description: 'Update phonebook by id',
  operationId: 'getUser',
  tags: ['phonebooks'],
  responses: {
    200: {
      description: "Requested user",
      schema: {
        $ref: '#/definitions/Phonebook'
      }
    },

    default: {
      description: "Unexpected error",
      schema: {
        $ref: '#/definitions/Error'
      }
    }
  }
};
