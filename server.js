// server.js
// load the things we need
var express = require('express');
var bodyparser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.use(bodyparser.urlencoded({ extended : false}));
app.use(bodyparser.json());

app.post('/',function(req, res) {


            var k = 0;


            console.log(req.body.username);

            var obj1 = {};
            var obj2 = {username : req.body.username , url : req.body.url , email : req.body.email , password : req.body.password , birthday : req.body.birthday , telephone : req.body.telephone , month : req.body.month , week : req.body.week};

	       
            if (/^[" "]*$/.test(req.body.username)) {
                
                k++;
                obj1.username = 0;    
                
            }   


            if (!/^(ftp|https?):\/\/+(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/.test(req.body.url)) {
                
                k++;
                obj1.url = 0;    
               
            }   

            if (!/^[a-zA-Z0-9.!#$&_~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.email)) {
                
                k++
                obj1.email = 0;    
               
                
            }   

            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(req.body.password)) {

                k++;
                obj1.password = 0;
            }   

            if (/^[0][1-9]|[12][0-9]|[3][01]-[0][1-9]|[1][0-2]-[0-9][0-9][0-9][0-9]/.test(req.body.birthday) ) {

                var q = new Date();
                var m = q.getMonth();
                var d = q.getDate();
                var y = q.getFullYear();

                var date = new Date(y,m,d);

                mydate = new Date(req.body.birthday);

                if( mydate > date)
                {
                    k++;
                    obj1.birthday = 0;
                }

                
            } else {

                k++;
                obj1.birthday = 0;

            }

            
            if (!/^[0-9]*$/.test(req.body.telephone) || req.body.telephone.length != 10) {
              
              k++;  
              obj1.telephone = 0;  
                
            }   

            if (/^[0-9]+$/.test(req.body.quant) ) {
                
              var num = parseInt(req.body.quant);

              if( num <1 || num > 5) {
                        
                        k++;
                        obj1.quant = 0;
                
              } 
                
            } else {

                k++;

                obj1.quant = 0;    
            }

            if (!/^[0-9][0-9][0-9][0-9]-[0][1-9]|[1][0-2]/.test(req.body.month)) {
                
                k++;
                obj1.month = 0;    
                
            }

            if (!/^[0-9][0-9][0-9][0-9]-W[0][1-9]|[1-4][0-9]|[5][0-2]/.test(req.body.week)) {
                
                k++;
                obj1.week = 0;    
                
            }

            if(k==0)
            {
                MongoClient.connect('mongodb://127.0.0.1:27017/expressdb', function(err, db) {
                    if(err) throw err;

                    var collection = db.collection('user_col');
                    collection.insert(obj2, function(err, docs) {
                        collection.count(function(err, count) {
                            console.log(format("count = %s", count));
                            console.log("data stored in database");
                            db.close();
                        });
                    });
                });
            }

            res.set('Content-Type' , 'application/json');
            res.send(JSON.stringify(obj1));



}); 
app.get('/', function(req, res) {

	console.log("yaha toh chal raha hai");

	var age = [
        { name: 'Shanu', drunkness: 21 },
        { name: 'Sujay', drunkness: 21 },
        { name: 'nitesh', drunkness: 22 }
    ];


    res.render('pages/index',{
    	age : age 
    });
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(3000);
console.log('3000 is the magic port');
