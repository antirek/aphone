const mongoose = require('mongoose');

const PhonebookSchema = (collection) => {
  return new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    status: {
      'type': Boolean,
      'required': true,
      'default': true,
    },
    items: [
      {
        name: String,
        phone: String,
      },
    ],
  }, {
    collection: collection,
  });
};

module.exports = PhonebookSchema;
