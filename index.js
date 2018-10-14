var mongoose = require('mongoose');
var ResourceSchema = require('./model');

var Resource = mongoose.model(
  'Resource', new ResourceSchema('book')
);

mongoose.connect('mongodb://localhost/phonebook');


Resource.find().then(res => console.log(res))