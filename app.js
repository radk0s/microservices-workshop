const express = require('express');
const bodyParser = require('body-parser');

module.exports = function(stockRepository) {
    const app = express();
    const routes = require('./routes.js')(stockRepository);

    app.use(bodyParser.json());

    app.get('/', routes.helloWorld);
    app.get('/stock', routes.findAll);
    app.get('/stock/:isbn', routes.getStockAvailability);
    app.post('/stock', routes.saveBook);
    app.use(routes.clientError);
    app.use(routes.serverError);

    return app;
}