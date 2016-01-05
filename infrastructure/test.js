var _ = require('lodash');
var heroin = require('heroin-js');

var test = {
    name: 'book-inventory-service-rc-test',
    config_vars: {
        MONGOLAB_URI: 'mongodb://heroku_4x78mgjj:5c76vmaot6lpjfdubl2k6f1qc4@ds033285.mongolab.com:33285/heroku_4x78mgjj'
    },
    domains: ['book-inventory-service-rc-test.herokuapp.com']
};

var config = _.merge({}, require('./base'), test);

var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});
configurator(config);
