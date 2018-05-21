var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

var { credentials } = require("./config");
var { user, password } = credentials;
mongoose.connect(
  `mongodb://${user}:${password}@ds129770.mlab.com:29770/yelpcamp-dev`
);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Darjeeling",
//     image: "http://outgotrip.com/wp-content/uploads/2017/08/DARJEELING.jpg"
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

app.get("/campgrounds", function(req, res) {
  //Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds", { campgrounds: allCampgrounds });
    }
  });
});

app.post("/campgrounds", function(req, res) {
  // get data from form and add to campgrounds array
  var { name, image } = req.body;

  var newCampground = { name, image };
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

app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.log("YELPCAMP server has started");
});
