const login = require('./../schemas/login');
const mongoose = require('mongoose');

module.exports = {
    loginCheck : loginCheck
}
function loginCheck (request, response) {
    login.find({ "username": request.username, "password": request.password }, '', function (error, documents) {
        if(documents.length > 0){
            response.send({"status":"sucess"});
        }else{
            response.send({"status":"failure","message":"Username and Password doesn't match"});
        }
    });
}