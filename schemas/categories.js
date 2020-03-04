const mongoose = require('mongoose');

module.exports = mongoose.model('categories', mongoose.Schema({
    name: String,
    isActive: Boolean
}, { collection: 'categories' }));