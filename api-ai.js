const userService = require('./user.service');
const apiCalls = require('./database');
const mongoose = require("mongoose");
const product = mongoose.model('category', mongoose.Schema({
  name: String,
  isActive: Boolean
}));
const offer = mongoose.model('sample', mongoose.Schema({
  name: String,
  type: String
},{collection: 'sample'}));

module.exports = function (app) {
  // Index route
  app.get('/', function (req, res) {
    res.send('Welcome to the Index Route');
  });

  // API.AI webhook route
  app.post('/webhook/apiai/', function (req, res) {
    if (req.body.queryResult.intent.displayName == "product") {
      product.find({}, 'name', function (error, documents) {
        var products = documents.map(e => {
          return e.name;
        })
        res.send(JSON.stringify({
          "fulfillmentMessages": [
            {
              "quickReplies": {
                "title": "Select any product from the below...",
                "quickReplies": products
              },
              "platform": "FACEBOOK"
            }]
        }));
      });
    } else if (req.body.queryResult.intent.displayName == "offer") {
      console.log("enter")
      offer.find({}, 'swaroop', function (error, documents) {
          console.log(documents);
      });
      res.send(JSON.stringify({'fulfillmentText': 'api calls to fetch product is not written kumarappan'}));
    } else {
      res.status(200).json('Sucessfull');
    }
    // Save User to MongoDB
    userService.saveUser(req, res, req.body.originalDetectIntentRequest.payload.data.sender.id);
  });
}


