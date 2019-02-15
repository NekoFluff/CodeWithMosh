const express = require('express');
const courses = require('../routes/courses');
const users = require('../routes/users');
const home = require('../routes/home');
const auth = require('../routes/auth');
const error = require('../middleware/error')
const helmet = require('helmet');

module.exports = function(app) {    
    app.use(helmet())  
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public')); 
    
    app.use('/api/auth', auth);
    app.use('/api/users', users);
    app.use('/api/courses', courses);
    app.use('/', home);
    // Error middleware
    app.use(error);
}