var User = require('./dbconnect.js');

var chris = new User({
  name: 'Chris',
  username: 'sevilayha2',
  password: 'password' 
});


// call the built-in save method to save to the database
chris.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully!');
});