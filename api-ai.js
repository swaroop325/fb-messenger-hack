const userService = require('./user.service');

module.exports = function(app) {
  // Index route
  app.get('/', function (req, res) {
    res.send('Welcome to the Index Route');
  });
  // API.AI webhook route
  app.post('/webhook/apiai/', function(req, res) {
    res.status(200).json('Sucessfull');
    console.log(req.queryResult)
    // Save User to MongoDB
   // userService.saveUser(req, res ,req.body.originalDetectIntentRequest.payload.data.sender.id);
  });
}


