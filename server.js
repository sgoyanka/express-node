
var express = require('express');
var bodyparser = require('body-parser');
var User = require('./dbconnect.js');
var app = express();

app.set('view engine', 'ejs');


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
            
                

                var user1 = new User({
    
                    username: req.body.username,
                    password: req.body.password,
                    quant: req.body.quant,
                    birthday : req.body.birthday,
                    email : req.body.email 
                });



                user1.save(function(err) {
                    if (err) throw err;

                    console.log('User saved successfully!');
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


app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.get('/username', function(req, res) {

   console.log("username page mai aa gaya");

    User.find({}, function (err, docs) {
        res.render('pages/username',{
            userdata : docs
        });
    });

   
});

app.get('/edit/:id', function(req, res) {

    User.findById(req.params.id, function (err, docs) {
        console.log(docs);
       res.render('pages/editdata',{ages :docs, b: req.params.id});
    });
    
});

/*app.get('/editdata', function(req, res) {
    res.render('pages/editdata',{
            userdata : req.params.docs
       });
});*/

app.post('/username',function(req,res){


    console.log("edit ke post mai aa gaya");
    console.log(req.body.password);

    User.findByIdAndUpdate(req.body.id,{$set :{username : req.body.username, birthday : req.body.birthday, password : req.body.password, email: req.body.email, quant: req.body.quant}}, function (err) {
       console.log("successfully updated");
       res.redirect('/username');

    });
});



app.listen(3000);
console.log('3000 is the magic port');
