const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const logRequest = (req, res, next) => {
    next();
};

app.use(bodyParser.json());

app.get('/', logRequest, function (req, res) {
    res.send('Hello World!');
});

app.post('/stock', (req, res) => {
    console.log(req.body);
    res.json(req.body)
})

app.use(clientError);
app.use(serverError);

function clientError(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function serverError(err, req, res, next) {
    res.status(err.status || 500);
    console.error(err.stack);
    res.json({
        message: err.message,
        error: (process.env.NODE_ENV === 'production') ? {} : err.toString()
    });
}

module.exports = app;