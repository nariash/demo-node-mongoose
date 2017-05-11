var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "jade");

app.get("/",function(req,res){
	res.render("index");
});

app.get("/login",function(req,res){
	User.find(function(err,doc){
		console.log(doc);
		res.render("login");
	});
});

app.get("/singup",function(req,res){
	res.render("singup");
});

app.post("/users",function(req,res){
	
	var user = new User({
		name: req.body.name,
		last_name:  req.body.lastname,
		username:  req.body.username,
		email: req.body.email, 
		password: req.body.password,
		password_confirmation: req.body.password_confirmation
	});

	console.log(user.password_confirmation);

	user.save().then(function(us){
		res.send("Guardamos los datos del usuario");
	},function(err){
		if (err) {
			console.log(String(err));
		}
		res.send("No pudimos guadar los datos del usuario");
	});

});

app.listen(8080);