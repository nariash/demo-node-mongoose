var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/dbdemouno");

var password_validation = {
			validator: function(p){
				this.password_confirmation == p;
			},
			message: "Las contraseñas no son iguales"
		}

var email_match = [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Coloca un email válido"];
var posibles_valores = ["M","F"];

var user_schema = Schema({
	name: String,
	last_name: String,
	username: {type:String,required:true,maxlength:[50,"Nombre de usuario muy grande"]},
	password: {
		type:String,
		minlength:[8,"La contraseña es muy corta"],
		validate: password_validation
	},
	age: {type:Number,min:[18,"No puedes ser menor de 18 años"],max:[100,"Debieras ya estar muerto"]},
	email: {type:String,required:"El correo es obligatorio",match:email_match},
	date_of_birht: Date,
	sex: {type:String,enum:{values:posibles_valores,message:"Opción no válida"}}
});

user_schema.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c = password;
});

var User = mongoose.model("User", user_schema);

module.exports.User = User;