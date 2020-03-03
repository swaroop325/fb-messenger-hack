'use strict'

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var mongoose = require('mongoose');
var database = require('./database');

// Pull information from HTML POST (express4)
var bodyParser = require('body-parser');

const dbURI = "mongodb+srv://user:user@cluster0-tuhhf.mongodb.net/retail?retryWrites=true&w=majority"
// Mongoose connection
const options = {
    reconnectTries: Number.MAX_VALUE,
    poolSize: 10
};

mongoose.connect(dbURI, options).then(
    () => {
        console.log("Database connection established!");
    },
    err => {
        console.log("Error connecting Database instance due to: ", err);
    }
);
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ 'extended': 'true' }));

// Parse application/json
app.use(bodyParser.json());

// Parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Routes
require('./api-ai.js')(app);

// Listen (start app with node index.js)
app.listen(port);
