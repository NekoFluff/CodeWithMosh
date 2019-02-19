const winston = require('winston');
const express = require('express');
const app = express();

app.set('view engine', 'pug')
app.set('views', './views') // Views for template engine

require('./startup/logging')(app);
require('./startup/routes')(app);
require('./startup/database')();
require('./startup/config')();
require('./startup/validation');

port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    winston.info(`Listening to port ${port}`);
});

module.exports = server;