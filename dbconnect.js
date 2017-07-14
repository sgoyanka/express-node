/*var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
    var string1 = "seconddb";
MongoClient.connect('mongodb://127.0.0.1:27017/'+string1, function (err, db) {
    if (err) {
        throw err;
		

    } else {
        console.log("successfully connected to the database");
        var collection = db.collection('seconddb');

        Cursor cursor = collection.find(); 
        var obj = JSON.parse(cursor.index);
        console.log(obj);
        // Let's close the db
        db.close();
    	
    }

    
});*/
/*var MongoClient = require('mongodb').MongoClient
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
});*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/expressdb');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});


userSchema.methods.dudify = function() {
  // add some stuff to the users name
  this.name = this.name + '-dude'; 

  return this.name;
};
// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
//module.exports = User;

// create a new user called chris
var chris = new User({
  name: 'Chris',
  username: 'sevilayha',
  password: 'password' 
});

// call the custom method. this will just add -dude to his name
// user will now be Chris-dude
chris.dudify(function(err, name) {
  if (err) throw err;

  console.log('Your new name is ' + name);
});

// call the built-in save method to save to the database
chris.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully!');
});