// server.js
// load the things we need
var express = require('express');
var bodyparser = require('body-parser');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.use(bodyparser.urlencoded({ extended : false}));
app.use(bodyparser.json());

app.post('/',function(req, res) {


            console.log(req.body.username);

            var obj1 = {};

	       
            if (/^[" "]*$/.test(req.body.username)) {
                
                obj1.username = 0;    
                
            }   


            if (!/^(ftp|https?):\/\/+(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/.test(req.body.url)) {
                
                obj1.url = 0;    
               
            }   

            if (!/^[a-zA-Z0-9.!#$&_~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.email)) {
                
                obj1.email = 0;    
               
                
            }   

            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(req.body.password)) {

                obj1.password = 0;
            }   

            if (/^[0][1-9]|[12][0-9]|[3][0-2]-[0][1-9]|[1][0-2]-[0-9][0-9][0-9][0-9]/.test(req.body.birthday) ) {

                var q = new Date();
                var m = q.getMonth();
                var d = q.getDate();
                var y = q.getFullYear();

                var date = new Date(y,m,d);

                mydate = new Date(req.body.birthday);

                if( mydate > date)
                {
                    obj1.birthday = 0;
                }

                
            } else {

                obj1.birthday = 0;

            }

            
            if (!/^[0-9]*$/.test(req.body.telephone) || req.body.telephone.length != 10) {
                
              obj1.telephone = 0;  
                
            }   

            if (/^[0-9]+$/.test(req.body.quant) ) {
                
              var num = parseInt(req.body.quant);

              if( num <1 || num > 5) {
                        
                        obj1.quant = 0;
                
              } 
                
            } else {

                obj1.quant = 0;    
            }

            if (!/^[0-9][0-9][0-9][0-9]-[0][1-9]|[1][0-2]/.test(req.body.month)) {
                
                obj1.month = 0;    
                
            }

            if (!/^[0-9][0-9][0-9][0-9]-W[0][1-9]|[1-4][0-9]|[5][0-2]/.test(req.body.week)) {
                
                obj1.week = 0;    
                
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

app.listen(8080);
console.log('3000 is the magic port');
