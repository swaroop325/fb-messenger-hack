const userService = require('./user.service');
const apiAiResponse = require('./api-response');
const path = require('path');

module.exports = function (app) {
  // Index route
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/index.html'));
  });

  // API.AI webhook route
  app.post('/webhook/apiai/', function (req, res) {
    apiAiResponse.respond(req.body.queryResult.intent.displayName, req, res);
    // Save User to MongoDB
    userService.saveUser(req, res, req.body.originalDetectIntentRequest.payload.data.sender.id);
  });
}


