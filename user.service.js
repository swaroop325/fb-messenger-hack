const User = require('./user');
const request = require('request');
const Mongoose = require("mongoose"),
  Types = Mongoose.Schema.Types;
//Employee Model without any fixed schema
const logCollectionSchema = new Mongoose.Schema({},
  { strict: false }
);
const LogCollection = Mongoose.model('log_collection', logCollectionSchema)

module.exports = {
  getFacebookData: getFacebookData,
  saveUser: saveUser
}

function saveUser(request, response, facebookId, firstName, lastName) {

  getFacebookData(facebookId, function (err, userData) {
    let user = {
      facebookId: facebookId,
      firstName: firstName || userData.first_name,
      lastName: lastName || userData.last_name
    };
    let logData = {
      request: request,
      response: response || null
    }
    console.log(logData);
    var doc = new User(user);
    doc.save(function (err) {
      if (err) return handleError(err);
      var log = new LogCollection(logData)
      log.save(function (err) {
        if (err) return handleError(err);
        console.log("saved log!!!")
      });
      console.log("saved!!!")
    });
  });
}
function saveLog(request, response) {
  let logData = {
    request: request,
    response: response
  }
  var log = new LogCollection(logData)
  log.save(function (err) {
    if (err) return handleError(err);
    console.log("saved log!!!")
  });

}
// Get User data from Messenger Platform User Profile API **NOT GRAPH API**
function getFacebookData(facebookId, callback) {

  request({
    method: 'GET',
    url: 'https://graph.facebook.com/v2.8/' + facebookId,
    qs: {
      access_token: process.env.FB_PAGE_ACCESS_TOKEN
    }
  },

    function (err, response, body) {

      let userData = null
      if (err) console.log(err);
      else userData = JSON.parse(response.body);

      callback(err, userData);
    });
}
