require('express-async-errors');
const winston = require('winston');
const express = require('express');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const config = require('config');
const courses = require('./routes/courses');
const users = require('./routes/users');
const home = require('./routes/home');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const error = require('./middleware/error')

winston.add(winston.transports.File, { filename: 'logfile.log' })

try {
    config.get('jwtPrivateKey')
} catch (ex) {
    console.log(ex.message)
    process.exit(1);
}

// Debuggers
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true }) // Conenct to the playground database
.then(() => dbDebugger('Connected to the playground database!'))
.catch((err) => dbDebugger('Failed to connect to the playground database', err));


// Read the configuration
// console.log(`Name of application: ${config.get('name')}`);
// console.log(`Mail Server: ${config.get('mail.host')}`);
// console.log(`Mail Server Password: ${config.get('mail.password')}`);

app.set('view engine', 'pug')
app.set('views', './views') // Views for template engine

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

app.use(logger);

app.use(function(req, res, next) {
    console.log('Authenticating...');
    next();
});

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/courses', courses);
app.use('/', home);

// Error middleware
app.use(error);

port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});