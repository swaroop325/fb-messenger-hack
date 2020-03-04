const mongoose = require('mongoose');

module.exports = mongoose.model('offer', mongoose.Schema({
    name: String,
    type: String,
    percentage: Number,
    isActive: Boolean,
    products: [String]
}, { collection: 'offer' }));