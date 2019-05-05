const config = require('config');
const mongoose = require('mongoose');
const path = require('path');

const createApp = require('./app').createApp;
const phonebookSchema = require('./models/phonebook');

const settingsConn = mongoose.createConnection(config.mongodb, {
  useNewUrlParser: true,
});

const Phonebook = settingsConn.model(
    'Phonebook', phonebookSchema('phonebook')
);

console.log('config', config);

const manageApp = createApp({
  apiDoc: require('./manage/api-doc.js'),
  paths: path.resolve(__dirname, 'manage/api-routes'),
  dependencies: {
    Phonebook,
  },
});

manageApp.listen(config.port);
