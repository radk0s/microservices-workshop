module.exports = function(stockRepository) {
    return {
        helloWorld(req, res) {
            res.send('Hello World!');
        },
        findAll(req, res) {
            stockRepository.getBooks()
                .then(books => res.json(books))
                .catch(err => res.status(500).send('get all books error'))
        },
        getStockAvailability(req, res) {
            stockRepository.getAvailability(req.params.isbn)
                .then(count => res.format({
                    'text/html': function(){
                        res.send(`<p>Book with ISBN ${req.params.isbn} availability: ${count}</p>`);
                    },
                    'application/json': function(){
                        res.json({count: count});
                    },
                    'default': function() {
                        res.status(406).send('Not Acceptable');
                    }
                }))
                .catch(err => res.status(404).send('No book with ISBN ' + req.params.isbn))
        },
        saveBook(req, res) {
            stockRepository.saveBook({isbn: req.body.isbn, count: req.body.count})
                .then(() => res.json({isbn: req.body.isbn, count: req.body.count}))
                .catch(err => res.status(500).send('save book error'))
        },
        clientError(req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        },

        serverError(err, req, res, next) {
            res.status(err.status || 500);
            console.error(err.stack);
            res.json({
                message: err.message,
                error: (process.env.NODE_ENV === 'production') ? {} : err.toString()
            });
        }
    }

};