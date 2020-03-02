const userService = require('./user.service');
const apiCalls = require('./database')
module.exports = function(app) {
  // Index route
  app.get('/', function (req, res) {
    res.send('Welcome to the Index Route');
  });
  
  // API.AI webhook route
  app.post('/webhook/apiai/', function(req, res) {
    if(req.body.queryResult.intent.displayName == "product"){
//call other service
    }else{
      res.status(200).json('Sucessfull');
    }
    // Save User to MongoDB
   userService.saveUser(req, res ,req.body.originalDetectIntentRequest.payload.data.sender.id);
  });
}


