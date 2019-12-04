var express               = require("express"),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user"),
    app                   = express(),
    listSchema            = new mongoose.Schema({
                                entry: String
                            }),
    list                  = mongoose.model("list", listSchema);

mongoose.connect("mongodb://localhost/social_app");

app.use(require("express-session")({
    secret: "we must kill this love its sad but its true",
    resave: false,
    saveUninitialized: false
}));

app.use(express.static("public"));
app.use(express.static("public/scripts"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");

//########## routes
app.get("/", function(req, res){
    res.render("home");
});

//############ user authentication
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    req.body.username
    req.body.password 
    User.register(new User({username: req.body.username, firstname: req.body.fname, lastname: req.body.lname, birthday: req.body.birthday,
         address: req.body.address, zipcode: req.body.zipcode, email: req.body.email}), req.body.password, function(err, user){
        if(err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });
});

//####### login
app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"   
    }), function(req, res){

});

//##### log out
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

//########## logged in 
app.get("/secret", isLoggedIn, function(req, res){
    res.redirect("secret/" + req.user.username);
});

app.get("/secret/:currentusername", isLoggedIn, function(req, res){
    res.render("secret", ({currentUser: req.user, name: req.user}));
});

app.get("/true", isLoggedIn, function(req, res){
    res.render("logged");
});

app.get("/loggedinhome", isLoggedIn, function(req, res){
    res.render("loggedinhome", {currentUser: req.user, name: req.user});
});

//############## adding to to-do list

/*
app.post("/secret/:currentusername", isLoggedIn, function(req, res){
    var entry = req.body.entry;
    var newEntry = { entry: entry };
    list.create(newEntry, function(err, newlyCreated) {
        if(err) { 
            console.log(err);
        } else {
            res.redirect("/secret/:currentusername");
        }
    });

});
*/

//##############

app.listen(process.env.PORT, process.env.IP);

//app.listen(3000, process.env.IP);