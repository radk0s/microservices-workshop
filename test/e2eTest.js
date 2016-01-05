const request = require('supertest');
const stockRepository = require('../InMemoryStockRepository.js');
const app = require('../app.js')(stockRepository);

describe('POST /stock', () => {
    it('respond with correct ISBN', (done) => {
        request(app)
            .post('/stock')
            .set('Accept', 'application/json')
            .send({isbn: 1234567890, count: 10})
            .expect('Content-Type', /json/)
            .expect(200, {
                isbn: 1234567890,
                count: 10
            }, done);
    })
});

describe('GET /stock/:isbn', () => {
    it('respond with 404', (done) => {
        request(app)
            .get('/stock/23')
            .set('Accept', 'application/json')
            .expect(404, done);
    })

    it('respond with correct count', (done) => {
        const agent = request.agent(app);
        agent
            .post('/stock')
            .set('Accept', 'application/json')
            .send({isbn: 16, count: 10})
            .then(() => {
                agent
                    .get('/stock/16')
                    .set('Accept', 'application/json')
                    .expect(200, {
                        count: 10
                    }, done);
            })
    })
});