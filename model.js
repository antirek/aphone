var mongoose = require('mongoose');

var ResourceSchema = function (collection) {
    return new mongoose.Schema({
        title: {
          type: String,
          required: true
        },
        status: {
          type: Boolean,
          required: true,
          "default": true
        },
        items: [
          {
            name: String,
            phones: Array
          }
        ]
    }, {
        collection: collection
    });

};
module.exports = ResourceSchema;