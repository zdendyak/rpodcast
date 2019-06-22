var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authMiddleware = require('./auth');
const history = require('connect-history-api-fallback');

module.exports = app => {
  app.use(history());
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan('combined'));
  app.use(express.static('public'));
  app.use(authMiddleware);
}