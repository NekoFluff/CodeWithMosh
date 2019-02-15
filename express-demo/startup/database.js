const winston = require('winston');
const mongoose = require('mongoose');
const dbDebugger = require('debug')('app:db');

module.exports = function() {
    mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true }) // Conenct to the playground database
    .then(() => {
        dbDebugger('Connected to the playground database!');
        winston.info('Connected to MongoDB...');
    });
}

