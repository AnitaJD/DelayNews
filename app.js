const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const logger = require('morgan');
const axios = require('axios');

const normalizePort = require('normalize-port');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index.js');

const app = express();
app.use(logger('dev'));

const hbs = handlebars.create({
  defaultLayout: 'layout',
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'views'),
  partialsDir: path.join(__dirname, 'views')
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRouter);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
