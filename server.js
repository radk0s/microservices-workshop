const express = require('express');
const app = express();

const logRequest = (req, res, next) => {
    console.log('log req');
    next();
};

const logRequest2 = (req, res, next) => {
    console.log('log req 2');
    next();
};

app.use(logRequest)
app.get('/', logRequest, function (req, res) {
    res.send('Hello World!');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});