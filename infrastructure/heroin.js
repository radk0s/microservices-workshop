var heroin = require('heroin-js');

var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

configurator.export('book-inventory-service-rc').then(function (result) {
    console.log(result);
});
