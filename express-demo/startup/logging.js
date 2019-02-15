const morgan = require('morgan'); 
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function (app) {
    // Handle Exceptions
    // (DEPRECATED) winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtExceptions.log' }))
    winston.exceptions.handle(
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
        new winston.transports.Console({ colorize: true, prettyPrint: true })
    )

    // Hack to handle rejections as an exception
    process.on('unhandledRejection', (rej) => {
        throw ex;
    })

    // Add file transport and mongodb transport
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    winston.add(new winston.transports.MongoDB({
        db: 'mongodb://localhost/playground',
        level: 'info'
    }));

    // Morgan (request logging)
    if (app.get('env') === 'development') {
        app.use(morgan('tiny'));
        winston.info('Morgan enabled...');
    }
}