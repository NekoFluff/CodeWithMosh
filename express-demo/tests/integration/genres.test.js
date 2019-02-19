const request = require('supertest');
const {Genre} = require('../../models/genre');
let server;

describe('/api/genres', () => {
    // Gets called before each test in this test suite.
    beforeEach(() => { server = require('../../app'); }) ;
    afterEach(async () => { 
        server.close();
        await Genre.remove(); // Clean up the collection
     });

    describe('GET /', () => {
        it('should return all genres', async () => {
            // Insert dummy vallues into the collection
            await Genre.collection.insertMany([
                { name: 'Genre A' }, 
                { name: 'Genre B' }
            ]);

            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);

            // The body contains an object whose name is Genre A and another object whose name is Genre B
            expect(res.body.some(obj => obj.name === 'Genre A')).toBeTruthy();
            expect(res.body.some(obj => obj.name === 'Genre B')).toBeTruthy();
            
        });
    });

    describe('GET/:id', () => {
        it('should return a genre if valid id is passed', async () => {
            const genre = new Genre({ name: 'Genre A '});
            await genre.save();

            const res = await request(server).get('/api/genres/' + genre._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        });

        it('should return 404 if an invalid id is passed', async () => {
            const res = await request(server).get('/api/genres/1');
            expect(res.status).toBe(404);
        });
    });
});