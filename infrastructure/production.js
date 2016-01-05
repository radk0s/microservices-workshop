var _ = require('lodash');
var heroin = require('heroin-js');

var prod = {
    name: 'book-inventory-service-rc',
    config_vars: {
        MONGOLAB_URI: 'mongodb://heroku_4x78mgjj:5c76vmaot6lpjfdubl2k6f1qc4@ds033285.mongolab.com:33285/heroku_4x78mgjj'
    },
    domains: ['book-inventory-service-rc.herokuapp.com']
};

var config = _.merge({}, require('./base'), prod);

var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});
configurator(config);