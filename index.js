const mongoose = require('mongoose');
const config = require('config');

const phonebookSchema = require('./models/phonebook');


const Phonebook = mongoose.model(
    'Phonebook', phonebookSchema('phonebook')
);

mongoose.connect('mongodb://localhost/phonebook', {useNewUrlParser: true});
const token = '561a58';

const {DigiumGenerator,
  YealinkGenerator,
  GrandstreamGenerator,
  FanvilGenerator,
  SnomGenerator,
  HtekGenerator,
} = require('phonebook-generator');

const vendors = {
  yealink: new YealinkGenerator(),
  digium: new DigiumGenerator(),
  grandstream: new GrandstreamGenerator(),
  fanvil: new FanvilGenerator(),
  dlink: new FanvilGenerator(),
  snom: new SnomGenerator(),
  htek: new HtekGenerator(),
};

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const openapi = require('express-openapi');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

openapi.initialize({
  apiDoc: require('./api-doc.js'),
  app: app,
  paths: path.resolve(__dirname, 'api-routes'),
  dependencies: {
    Phonebook,
  },
});


app.get([
  '/v1/phonebook/:vendor/:token/:index',
  '/v1/phonebook/:vendor/:token',
], (req, res) => {
  const reqToken = req.params.token;
  // const index = req.params.index || 0;
  const vendor = req.params.vendor;
  console.log('request', vendor, reqToken);

  if (reqToken !== token) {
    console.log('request token', reqToken, 'is not valid');
    res.end();
    return;
  }

  /*
  var phonebook = new Phonebook({
    title: 'New',
    label: 'main',
    items: [
        {name: 'Va1', phone: '1212'},
        {name: 'Va2', phone: '1313'},
    ]
  })

  phonebook.save();
*/
  Phonebook.findOne()
  // .then(res => console.log(res))
      .then((phonebook) => {
        return phonebook.items;
      })
      .then((json) => {
        return vendors[vendor].prepareXML(json);
      })
      .then((v) => {
        res.set('Content-Type', 'text/xml').send(v);
      })
      .catch((err) => {
        console.log(err);
        res.end();
      });
});

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(config.port);
