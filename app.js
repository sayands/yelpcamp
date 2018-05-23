var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override");
(Campground = require("./models/campground")),
  (Comment = require("./models/comment")),
  (User = require("./models/user")),
  (seedDB = require("./seeds"));

// requiring routes
var commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index");

// =======================
// APP CONFIGURATION
// =======================

var { credentials } = require("./config");
var { user, password } = credentials;
mongoose.connect(
  `mongodb://${user}:${password}@ds129770.mlab.com:29770/yelpcamp-dev`
);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// seed the database
//seedDB();

// ======================
// PASSPORT CONFIGURATION
// ======================
app.use(
  require("express-session")({
    secret: "Say123#@@@",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.log("YELPCAMP server has started");
});
