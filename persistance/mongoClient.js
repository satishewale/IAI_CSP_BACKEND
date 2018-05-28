var mongo = require('mongodb');

var MongoClient = mongo.MongoClient;

var myCollection;
var initMongoClient = function(){

   MongoClient.connect('mongodb://127.0.0.1:27017', function(err, client) {
        if(err){
            console.log("Erroe while creareting connection" + JSON.stringify(err));
            return;
        }

        console.log("connected to the mongoDB !");
        const db = client.db("csp");

        myCollection = db.collection('customerList');
    });
};

initMongoClient.prototype.insertProduct = function(requestBody,callback){
    console.log("mongoClient.js >> Came into insertProduct");
    requestBody.createddate = new Date();
    myCollection.insert(requestBody,function(error,result){

        if(error){
            callback("error occured")
            return;
        }

        callback(null,result);

    });
};

initMongoClient.prototype.findProduct = function(requestBody,callback){
    console.log("mongoClient.js >> Came into getProduct");
    myCollection.findOne(requestBody,function(error,result){

        if(error){
            callback("error occured")
            return;
        }

        callback(null,result);

    });
};

initMongoClient.prototype.findAll = function(requestBody,callback){
    console.log("mongoClient.js >> Came into findAll");
    myCollection.find(requestBody).toArray(function(error,result){

        if(error){
            callback("error occured")
            return;
        }

        callback(null,result);

    });
};


module.exports = new initMongoClient();
