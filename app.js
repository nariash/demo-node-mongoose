var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var session = require("express-session");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	secret: "aSdFgHjKlÑ13579",
	resave: false,
	saveUninitialized: false
}));

app.set("view engine", "jade");

app.get("/",function(req,res){
	res.render("index");
	console.log(req.session.user_id, req.session.name);
});

app.get("/login",function(req,res){
	var vars = {};
	User.find(function(err,doc){
		console.log(doc);		
	});
	//console.log('req',req.originalUrl, typeof req.originalUrl);
	/*if (req.param("type")) {
		vars.type = req.param("type"),
		vars.feedback= req.param("feedback")
	}*/
	res.render("login", vars);
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
		//res.send("Guardamos los datos del usuario");
		res.redirect("login?type=success&feedback=Guardamos los datos del usuario");
	},function(err){
		if (err) {
			console.log(String(err));
		}
		var feedbackMsg = "No pudimos guadar los datos del usuario";
		//res.send(feedbackMsg);
		//res.status(500).json({ feedback: feedbackMsg });
		res.render("users",{type:"warning",feedback: feedbackMsg});
		//res.redirect("login");
		setTimeout(function(){ res.redirect("singup"); }, 2000);

	});

});

app.post("/sessions",function(req,res){
	User.findOne({email:req.body.email,password:req.body.password},function(err,user){
		if (user) {
			console.log(user);
			req.session.user_id = user._id;
			req.session.name = user.name;
			res.send("Usuarios rescatados");						
		}else{
			res.send("No existe el usuario");
		}
	});
});

app.listen(8080);