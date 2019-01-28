const express = require('express');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const config = require('config');
const courses = require('./routes/courses')
const home = require('./routes/home')

// Debuggers
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

// Read the configuration
console.log(`Name of application: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Server Password: ${config.get('mail.password')}`);

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

app.use(logger);

dbDebugger('Connected to the database...');

app.use(function(req, res, next) {
    console.log('Authenticating...');
    next();
});

app.use('/api/courses', courses);
app.use('/', home);

port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});