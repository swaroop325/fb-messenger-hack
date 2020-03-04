const product = require('./../schemas/product');
const offers = require('./../schemas/offers');
const categories = require('./../schemas/categories');

module.exports = {
    respond: respond
}

function respond(apiIntent, request, response) {
    if (apiIntent == "product") {
        categories.find({}, 'name', function (error, documents) {
            var products = documents.map(e => {
                return e.name;
            })
            response.send(JSON.stringify({
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
    } else if (apiIntent == "productList") {
        product.find({ "category": request.body.queryResult.queryText }, '', function (error, documents) {
            var products = documents.map(e => {
                var info = {
                    "card": {
                        "title": e.name,
                        "subtitle": e.weight,
                        "imageUri": e.image,
                        "buttons": [
                            {   "type": "web_url",
                                "text": "Rs." + e.price,
                                "postback": "https://needs-store.herokuapp.com/",
                                "messenger_extensions": true
                            }
                        ]
                    }
                }
                return info;
            })
            response.send({
                "fulfillmentMessages": products
            });
        });

    } else if (apiIntent == "offer") {
        offers.find({}, 'name', function (error, documents) {
            var offers = documents.map(e => {
                return e.name;
            })
            response.send(JSON.stringify({
                "fulfillmentMessages": [
                    {
                        "quickReplies": {
                            "title": "Select any offer from the below...",
                            "quickReplies": offers
                        },
                        "platform": "FACEBOOK"
                    }]
            }));
        });
    } else if (apiIntent == "offerList") {
        offers.find({ "name": request.body.queryResult.queryText }, 'products percentage', function (error, documents) {
            var products = documents[0].products;
            var discount = parseInt(documents[0].percentage) / 100;
            product.find({ "name": { "$in": products } }, '', function (error, documents) {
                var products = documents.map(e => {
                    var info = {
                        "card": {
                            "title": e.name,
                            "subtitle": e.weight,
                            "imageUri": e.image,
                            "buttons": [
                                {
                                    "type": "web_url",
                                    "messenger_extensions": true,
                                    "text": "Rs." + (e.price - (e.price * discount)),
                                    "postback": "https://needs-store.herokuapp.com/"
                                }
                            ]
                        }
                    }
                    return info;
                })
                response.send({
                    "fulfillmentMessages": products
                });
            });
        });
    } else {
        response.status(200).json('Sucessfull');
    }
}