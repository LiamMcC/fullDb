var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var session = require('express-session');
var passport = require("passport");

var mysql = require('mysql');
app.use(bodyParser.urlencoded({extended:true}));
//const db = mysql.createConnection({

//  host     : 'hostingmysql304.webapps.net',
 // user     : 'liamme',
 // password : 'Acad3m1c',
// database:'liam'

//});

app.use(session({secret: 'liam'}));






const db = mysql.createConnection({

  host     : 'den1.mysql1.gear.host',
  user     : 'nci',
  password : 'Yo7A_B09i4?1',
 database:'nci'

});

db.connect((err) => {
  if(err){
    throw err
    
  }
  
  console.log("Getting there liam it connected...")
});






app.use(express.static("views")); // Allow access to content of views folder
app.use(express.static("scripts")); // Allow access to scripts folder
app.use(express.static("images")); // Allow access to images folder




  app.post('/login', function(req, res) {
  var whichOne = req.body.username;
  
   let sql2 = 'SELECT password FROM user WHERE name= "'+whichOne+'"'
   let query = db.query(sql2, (err, res2) => {
    if(err) throw err;
    console.log(res2);
    
    var passx= res2[0].password
    console.log("You logged in with " + passx);
    req.session.email = passx;
  
    if(passx == "Password"){
    console.log("Logged in with: " + passx);
    
   res.redirect("/db");
   
  }
   //res.render("index.jade");
    //res.render("showit.jade", {res1,res2});
  });
 
  });





app.get('/testquery', function(req, res) {
  let sql = 'SELECT * FROM user'
 // let sql = 'SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE="BASE TABLE"' // this lists all tables 
  let query = db.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
    
    
  });
  res.send("Well done liam...");
  });















// SQL create table Example
app.get('/create', function(req, res) {
  let sql = 'CREATE TABLE stuff ( Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, Name varchar(255), Price varchar(255));'
  let query = db.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
    
    
  });
  res.send("Well done liam...");
  });

// End SQL create table Example


// SQL create user table Example
app.get('/createuserdb', function(req, res) {
  let sql = 'CREATE TABLE user ( id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(255), password varchar(255));'
  let query = db.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
    
    
  });
  res.send("Well done liam users created...");
  });

// End SQL create table Example


// create a user
app.get('/insertuser', function(req, res) {
  let sql = 'INSERT INTO user (name, password) VALUES ("Liam", "Password")'
  let query = db.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
    
    
  });
  res.send("Well done liam...");
  });



// SQL Select Example
app.get('/select', function(req, res) {
  var x12 = '"Item1"'
  var x13 = "SELECT * FROM stuff WHERE Name = " + x12
  let sql = x13
  let query = db.query(sql, (err, res1) => {
    if(err) throw err;
    console.log(res1);
     res.send(res1);
    
  });
 console.log("Simple SQL right!!!!")
  console.log(x13)
  });

// End SQL Select Example


// SQL Insert Example
app.get('/insert', function(req, res) {
  let sql = 'INSERT INTO items (Name, Price) VALUES ("Louise", 38)'
  let query = db.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
    
    
  });
  res.send("Well done liam...");
  });

// End SQL Insert Example


// SQL Update Example
app.get('/update', function(req, res) {
  let sql = 'UPDATE items SET Name = "Item2" WHERE Id = 2'
  let query = db.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
    
    
  });
  res.send("Update Achieved...");
  });

// End SQL Update Example


// SQL delete Example
app.get('/delete', function(req, res) {
  let sql = 'DELETE FROM items WHERE Id = 2;'
  let query = db.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
    
    
  });
  res.send("We have deleted this now...");
  });

// End SQL delete Example

// SQL insert stuff Example
app.get('/insertstuff', function(req, res) {
  
  let sql = 'INSERT INTO stuff (Name, Price) VALUES ("Spuddy", 105)'
  let query = db.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);
    
    
  });
  let sql2 = 'SELECT * FROM stuff'
  res.send(sql2);
  });

// End SQL Insert Example



// SQL Select Example
app.get('/db', function(req, res) {
  let sql = 'SELECT * FROM stuff'
  let query = db.query(sql, (err, res1) => {
    if(err) throw err;
    console.log(res1);
   // console.log(logged);
    // res.send(res1);
    console.log("The Session is " + req.session.email)
//rows = res1; // this is the info passed to the page 
    res.render("db.jade", {res1});
  });
  
 
  });

// End SQL Select Example



app.get('/', function(req, res) {
  res.render("index.jade");
  console.log("Home page now rendered");
  });


// app.get('/db' , function(req, res){
//   res.render("products.jade");
//   console.log("Products Page is rendered");
  
  
// })



// SQL insert stuff Example
app.get('/addit', function(req, res, next) {
  if (req.session.email == "Password"){

  res.render("addit.jade");
  console.log("you are authorised")
}
else
res.render("login.jade");
  });

// End SQL Insert Example


// SQL Insert Example with form 
app.post('/addit', function(req, res) {
 var name = req.body.name
 //var sport = req.body.sport
  //var xie = 'INSERT INTO items (Name, Price) VALUES("Spuddy", 38)';
  let sql = 'INSERT INTO stuff (Name, Price) VALUES ("'+name+'", "'+req.body.sport+'")'
  let query = db.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);    
    console.log(name);    
   // console.log(sport);


    
    
  });
  res.render("index.jade");
  });

// End SQL Insert Example


// Function to render the edit page for an individual item

app.get('/changeit/:id', function(req, res){
  var whichOne = req.params.id;
	let sql = 'SELECT * FROM stuff where (Id = "'+whichOne+'")'
  let query = db.query(sql, (err, res1) => {
    if(err) throw err;
    console.log(res1);
    
    // res.send(res1);
 //   console.log(res1)
//rows = res1; // this is the info passed to the page 
    res.render("changeit.jade", {res1});
  });
  
 
  });

// Function to render the edit page for an individual item


// Function to actually edit an individual item based on whats in the form

app.post('/changeit/:id', function(req, res) {
  var whichOne = req.params.id;
  var newname = req.body.newname;
  var newprice = req.body.newprice;
  let sql = 'UPDATE stuff SET Name = "'+newname+'", Price = "'+newprice+'" WHERE Id = "'+whichOne+'"'
  let query = db.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);    
    console.log("New Name " + newname);
        console.log("New Price" + newprice);        
    console.log("id " + whichOne);



    
    
  });

  // Now we redirect to the db page when the product updates
 res.redirect("/db");
  
 

  });

// Now we redirect to the db page when the product updates

// Delete

app.get('/deleteit/:id', function(req, res) {
  var whichOne = req.params.id;
  let sql = 'DELETE FROM stuff WHERE Id = "'+whichOne+'"'
  let query = db.query(sql, (err, res) => {
    if(err) throw err;
    console.log(res);    
       
    console.log("id " + whichOne);



    
    
  });

  // Now we redirect to the db page when the product updates
 res.redirect("/db");
  
 

  });

// Now we redirect to the db page when the product updates



// Function to render the individual item

app.get('/showit/:id', function(req, res){
  var whichOne = req.params.id;
	let sql = 'SELECT * FROM stuff where (Id = "'+whichOne+'")'
  let query = db.query(sql, (err, res1) => {
    if(err) throw err;
    console.log(res1);
    
    
    
    let sql2 = 'SELECT * FROM reviews'
  let query = db.query(sql2, (err, res2) => {
    if(err) throw err;
    console.log(res2);

    res.render("showit.jade", {res1,res2});
  });
  
  });
  });

// Function to render the  individual item







// Login functions 

// render login view

app.get('/login', function(req, res) {
  res.render("login.jade");
  console.log("login page now rendered");
  
let sql2 = 'SELECT password FROM user WHERE name= "Liam"'
  let query = db.query(sql2, (err, res2) => {
    if(err) throw err;
    console.log(res2);

    //res.render("showit.jade", {res1,res2});
  });
 
  });
  
  
  

  
  
// app.post("/login", passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/db'
// }));


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Yippee its running");
  
})



// res.redirect("/db");