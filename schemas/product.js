const mongoose = require('mongoose');

module.exports = mongoose.model('product', mongoose.Schema({
    name: String,
    price: String,
    type: String,
    category: String,
    weight: String,
    image: String
}, { collection: 'product' }));