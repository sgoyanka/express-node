
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/expressnode');
db.once('open', function callback() {
                console.log('db connection open');
            });

console.log("connected to database successfully");
var Schema = mongoose.Schema;

var userSchema = new Schema({

    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quant: Number,
    birthday: Date,
    email : { type : String, required: true, unique: true, validate: {
                validator: function(v) {
                    return /^[a-zA-Z0-9.!#$&_~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v);
                },
            message: '{VALUE} is not a valid email!'
            } 
        }
});



var User = db.model('User', userSchema);

module.exports = User;

