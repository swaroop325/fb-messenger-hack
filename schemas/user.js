const mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  facebookId: { type: String, required: true },
  firstName: String,
  lastName: String
});
