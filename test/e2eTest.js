const request = require('supertest');
const app = require('../app.js');

describe('POST /stock', () => {
    it('respond with correct ISBN', (done) => {
        request(app)
            .post('/stock')
            .set('Accept', 'application/json')
            .send({isbn: 1234567890})
            .expect('Content-Type', /json/)
            .expect(200, {
                isbn: 1234567890
            }, done);
    })
});