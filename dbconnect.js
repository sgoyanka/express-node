/*var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
    var string1 = "seconddb";
MongoClient.connect('mongodb://127.0.0.1:27017/'+string1, function (err, db) {
    if (err) {
        throw err;
		

    } else {
        console.log("successfully connected to the database");
        var collection = db.collection('seconddb');

        collection.find().toArray(function(err, results) {
        console.dir(results);
        // Let's close the db
        db.close();
    });
    	
    }

    
});*/
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

obj = {a:1,b:2,c:3};
MongoClient.connect('mongodb://127.0.0.1:27017/seconddb', function(err, db) {
    if(err) throw err;

    var collection = db.collection('seconddb');
    collection.insert(obj, function(err, docs) {
        collection.count(function(err, count) {
            console.log(format("count = %s", count));
            db.close();
        });
    });
});