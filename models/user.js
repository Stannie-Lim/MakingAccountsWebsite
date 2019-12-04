var mongoose                = require("mongoose");
var passportLocalMongoose   = require("passport-local-mongoose");


var userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    birthday: String,
    address: String,
    address2: String,
    zipcode: Number,
    username: String,
    password: String,
    email: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
