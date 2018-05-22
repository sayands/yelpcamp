var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  User = require("./models/user");

var { credentials } = require("./config");
var { user, password } = credentials;
mongoose.connect(
  `mongodb://${user}:${password}@ds129770.mlab.com:29770/yelpcamp-dev`
);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Campground.create(
//   {
//     name: "Darjeeling",
//     image: "http://outgotrip.com/wp-content/uploads/2017/08/DARJEELING.jpg",
//     description: "This is a very nice place."
//   },
//   function(err, campground) {
//     if (err) console.log(err);
//     else {
//       console.log("Newly Created Campground");
//       console.log(campground);
//     }
//   }
// );

app.get("/", function(req, res) {
  res.render("landing");
});

//INDEX - Show all campgrounds
app.get("/campgrounds", function(req, res) {
  //Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});

//CREATE - Add new campground to DB
app.post("/campgrounds", function(req, res) {
  // get data from form and add to campgrounds array
  var { name, image, description } = req.body;

  var newCampground = { name, image, description };
  //Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

//NEW - Show form to create new campgrounds
app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
  //find the campground with provided id
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      //render show template with that campground
      res.render("show", { campground: foundCampground });
    }
  });
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.log("YELPCAMP server has started");
});
