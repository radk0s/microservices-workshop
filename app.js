const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var url = 'mongodb://localhost:27017/book_inventory_service';

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    app.use(bodyParser.json());

    app.get('/', function (req, res) {
        res.send('Hello World!');
    });

    app.get('/stock', function (req, res) {
            const col = db.collection('books');
            col.find({}).toArray(function(err, docs) {
                res.json(docs);
            });
    });

    app.post('/stock', (req, res) => {
        const col = db.collection('books');
        col.updateOne(
                {
                    isbn: isbn,
                    count: count
                },
                {upsert: true});
        });
        res.json(req.body)
    });

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

    var server = app.listen(3000, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Example app listening at http://%s:%s', host, port);
    });

});

module.exports = app;