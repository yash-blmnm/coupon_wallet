module.exports = function() {
    var express = require('express'),
        app = express(),
        cors = require('cors'),
        bodyParser = require('body-parser');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());
    
    return app;

}