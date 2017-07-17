var User = require('./dbconnect.js');

var chris = new User({
  username: 'sevilayha2',
  password: 'password',
  quant: 5,
  birthday : 23-07-1997,
  email : 'shanu@gmail.com' 
});


// call the built-in save method to save to the database
chris.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully!');
});

