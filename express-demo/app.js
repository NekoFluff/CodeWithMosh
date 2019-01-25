const express = require('express');
const log = require('./logger');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const config = require('config');

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
app.use(log);

dbDebugger('Connected to the database...');

app.use(function(req, res, next) {
    console.log('Authenticating...');
    next();
});

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

app.get('/', (req, res) => {
    //res.send('Hello World');
    res.render('index', { title: "My Express App", message: "Hello World!"})
});

port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});