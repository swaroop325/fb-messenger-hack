const mongoose = require('mongoose');

module.exports = mongoose.model('login', 
    mongoose.Schema({username: String, password: String}, {collection: 'login'})
);