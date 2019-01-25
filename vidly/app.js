const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const movies = [
    {id: 1, name: "Avengers", average_rating: 5},
    {id: 2, name: "Spider-Man", average_rating: 3},
    {id: 3, name: "Thor", average_rating: 4.5}
];

app.get('/', (req, res) => {
    res.send("Welcome to the Movies website!");
});

app.get('/api/movies', (req, res) => {
    res.send(movies);
});

app.post('/api/movies/', (req, res) => {
    const { error } = validateMovie(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const movie = {
        id: movies.length + 1, 
        name: req.body.name,
        average_rating: req.body.average_rating
    };

    movies.push(movie);
    res.send(movie);
})

app.put('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('The movie with the given id was not found.');
    

    const { error } = validateMovie(req.body); // Deconstructor
    if (error) return res.status(400).send(error.details[0].message);

    // Update the movie
    movie.name = req.body.name;
    movie.average_rating = req.body.average_rating;
    res.send(movie);

})

app.delete('/api/movies/:id', (req, res) => {
    // Look up the movie
    // Not existing, return 404
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('The movie with the given id was not found.');

    // Delete
    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    res.send(movie);

    // Return the same movie
    return movie;
})

function validateMovie(movie) {
    const schema = {
        name: Joi.string().min(3).required(),
        average_rating: Joi.number().required()
    };

    return Joi.validate(movie, schema);
}

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
});