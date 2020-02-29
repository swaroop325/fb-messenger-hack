const userService = require('./user.service');

module.exports = function(app) {
  // Index route
  app.get('/', function (req, res) {
    res.send('Welcome to the Index Route');
  });
  // API.AI webhook route
  app.post('/webhook/apiai/', function(req, res) {
    res.status(200).json('Sucessfull');

    // Save User to MongoDB
    userService.saveLog(req, res);
    userService.saveUser(req.body.originalDetectIntentRequest.payload.data.sender.id);
  });
}


