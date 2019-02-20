const express = require('express');
const router = express.Router();
const {Rental} = require('../models/rental');
const auth = require('../middleware/auth');
const moment = require('moment');

router.post('/', auth, async (req, res) => {
    if (!req.body.customerId) res.status(400).send('Missing customer Id');
    if (!req.body.movieId) res.status(400).send('Missing movie Id');

    const rental = await Rental.findOne({
        'customer._id': req.body.customerId,
        'movie._id': req.body.movieId,
    });
    if (!rental) return res.status(404).send('Rental not found');

    if (rental.dateReturned) return res.status(400).send('This movie has already been returned');
    
    rental.dateReturned = new Date();
    rental.rentalFee = moment().diff(rental.dateOut, 'days') * rental.movie.dailyRentalRate;
    await rental.save();

    return res.status(200).send(rental);
});

module.exports = router;

// POST /api/returns {customerId, movieId}

// Return 401 if client is not logged in
// Return 400 if customerId is not provided
// Return 400 if movieId is not provided
// Return 404 if no rental found for this customer/movie
// Return 400 if rental already processed
// Return 200 if valid request
// Set the return date
// Calculate the rental fee
// Increase the stock of the returned movie
// Return the rental

