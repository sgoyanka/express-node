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

	console.log(req.body.a);

    if (/^[" "]*$/.test(req.body.username)) {
                
                k++;    
                
            }   else {

                
            }


            if (!/^(ftp|https?):\/\/+(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/.test(url.value)) {
                
                k++;    
               
            }   else {

                
                
            }

            if (!/^[a-zA-Z0-9.!#$&_~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value)) {
                
                k++;    
               
                
            }   else {

               
            }

            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(password.value)) {

                k++;
               
    
                    

            }   else {

               s
            }

        /*if (/^[0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9]/.test(birthday.value) ) {


                var q = new Date();
                  var m = q.getMonth();
                  var d = q.getDate();
                  var y = q.getFullYear();

                  var date = new Date(y,m,d);

                  mydate = new Date(birthday.value);


                  if ( isNaN(mydate.getTime()) && mydate > date)  {
                    k++;
                    document.getElementById('errorbday').style.visibility = "visible";
                    document.getElementById('bdayid').style.borderColor = "red";
    
                }   else {

                    document.getElementById('errorbday').style.visibility = "hidden";
                    document.getElementById('bdayid').style.borderColor = "green";
    
                } 

            }   else {

                document.getElementById('errorbday').style.visibility = "visible";
                document.getElementById('bdayid').style.borderColor = "red";
    
            } */


            
            if (!/^[0-9]*$/.test(telephone.value) || telephone.value.length != 10) {
                
              k++;  
              document.getElementById('errortel').style.visibility = "visible";
                document.getElementById('telp').style.borderColor = "red";
                
            } else {

                
                document.getElementById('errortel').style.visibility = "hidden";
                document.getElementById('telp').style.borderColor = "green";
                
            }

            if (/^[0-9]+$/.test(quant.value) ) {
                
              var num = parseInt(quant.value);

              if( num >0 && num < 6) {
                        
                document.getElementById('errorquant').style.visibility = "hidden";
                  document.getElementById('quantp').style.borderColor = "green";
              } else {

                 k++;   
                document.getElementById('errorquant').style.visibility = "visible";
                   document.getElementById('quantp').style.borderColor = "red";
                }
                
            } else {

                k++;    
              document.getElementById('errorquant').style.visibility = "visible";
                document.getElementById('quantp').style.borderColor = "red";
            }

            /*if (!/^Week[" "][0-4][0-9][,][" "][0-9][0-9][0-9][0-9]/.test(week.value)) {
                
                k++;    
                document.getElementById('errorweek').style.visibility = "visible";                  
                document.getElementById('weekid').style.borderColor = "red";
                
            }   else {

                document.getElementById('errorweek').style.visibility = "hidden";
                document.getElementById('weekid').style.borderColor = "green";
                
            }*/




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
