const stockRepository = require('./StockRepository.js');
const app = require('./app.js')(stockRepository);


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});