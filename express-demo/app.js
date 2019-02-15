const winston = require('winston');
const express = require('express');
const app = express();

app.set('view engine', 'pug')
app.set('views', './views') // Views for template engine

require('./startup/logging')(app);
require('./startup/routes')(app);
require('./startup/database')();
require('./startup/config')();

port = process.env.PORT || 3000
app.listen(port, () => {
    winston.info(`Listening to port ${port}`);
});