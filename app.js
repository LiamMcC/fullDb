var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var mysql = require('mysql');
app.use(bodyParser.urlencoded({extended:true}));
//const db = mysql.createConnection({

//  host     : 'hostingmysql304.webapps.net',
 // user     : 'liamme',
 // password : 'Acad3m1c',
// database:'liam'

//});

const db = mysql.createConnection({

  host     : 'den1.mysql1.gear.host',
  user     : 'nci',
  password : 'Yo7A_B09i4?1',
 database:'NCI'

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
    
    // res.send(res1);
 //   console.log(res1)
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
app.get('/addit', function(req, res) {
  

  res.render("addit.jade");
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
    console.log(sport);


    
    
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



// Function to render the individual item

app.get('/showit/:id', function(req, res){
  var whichOne = req.params.id;
	let sql = 'SELECT * FROM stuff where (Id = "'+whichOne+'")'
  let query = db.query(sql, (err, res1) => {
    if(err) throw err;
    console.log(res1);
    

    res.render("showit.jade", {res1});
  });
  
 
  });

// Function to render the  individual item


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Yippee its running");
  
})

