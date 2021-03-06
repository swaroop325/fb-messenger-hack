const User = require('./../schemas/user');
const request = require('request');
const mongoose = require("mongoose");

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
    // var logData = {
    //   request: request || null,
    //   response: response || null,
    // }
    var doc = new User(user);
    doc.save(function (err) {
      if (err) return handleError(err);
      console.log("saved!!!")
    });
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
