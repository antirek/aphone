module.exports = {
  parameters: [
    {
      name: 'id',
      in: 'path',
      type: 'string',
      required: true,
      description: 'id',
    },
  ],
  get: get,
  post: [function(req, res, next) {
    next();
  }],
};

/**
*
* @param {Object} req
* @param {Object} res
*/
function get(req, res) {
  console.log('qqw', req.params);
  res.status(200).json({
    id: req.params.id,
    name: req.query.name,
    age: req.query.age,
  });
}

get.apiDoc = {
  description: 'Retrieve phonebook by id',
  operationId: 'getPhonebook',
  tags: ['phonebooks'],
  responses: {
    200: {
      description: 'Requested user',
      schema: {
        $ref: '#/definitions/Phonebook',
      },
    },

    default: {
      description: 'Unexpected error',
      schema: {
        $ref: '#/definitions/Error',
      },
    },
  },
};

module.exports.post.apiDoc = {
  description: 'Update phonebook by id',
  operationId: 'getUser',
  tags: ['phonebooks'],
  responses: {
    200: {
      description: 'Requested user',
      schema: {
        $ref: '#/definitions/Phonebook',
      },
    },

    default: {
      description: 'Unexpected error',
      schema: {
        $ref: '#/definitions/Error',
      },
    },
  },
};
