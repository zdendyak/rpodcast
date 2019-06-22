const express = require('express');
const db = require('./db');
const mdlw = require('./middlewares');
const api = require('./api');
const app = express();

db.connect();
mdlw(app);
api(app);

module.exports = app;