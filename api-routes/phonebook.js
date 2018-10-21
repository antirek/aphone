// Showing that you don't need to have apiDoc defined on methodHandlers.
module.exports = (Phonebook) => {
  const doc = {
    get: [(req, res, next) => {
      Phonebook.find(null, {'_id': 0, '__v': 0, 'items._id': 0})
          .then((result) => {
          // console.log(result)
            res.status(200).json(result);
          });
    }],
    post: (req, res, next) => {
      console.log('post:', req.body);
      const phonebook = new Phonebook(req.body);
      phonebook.save()
          .then(() => {
            res.status(200).json(req.body);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).end();
          });
    },
  };

  doc.get.apiDoc = {
    description: 'list phonebooks',
    operationId: 'get',
    tags: ['phonebooks'],
    parameters: [],
    responses: {
      200: {
        description: 'list phonebooks',
        schema: {
          type: 'array',
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

  doc.post.apiDoc = {
    description: 'create new phonebook',
    operationId: 'post',
    tags: ['phonebooks'],
    parameters: [{
      in: 'body',
      name: 'user',
      description: 'The user to create.',
      schema: {
        $ref: '#/definitions/Phonebook',
      },
    }],
    responses: {
      200: {
        description: 'created phonebook',
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

  return doc;
};
