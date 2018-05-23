var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// =========================
//  CAMPGROUND ROUTES
// =========================

//INDEX - Show all campgrounds
router.get("/", function(req, res) {
  //console.log(req.user);
  //Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});

//CREATE - Add new campground to DB
router.post("/", isLoggedIn, function(req, res) {
  // get data from form and add to campgrounds array
  var { name, image, description } = req.body;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = { name, image, description, author };
  //Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      console.log(newlyCreated);
      res.redirect("/campgrounds");
    }
  });
});

//NEW - Show form to create new campgrounds
router.get("/new", isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res) {
  //find the campground with provided id
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        //console.log(foundCampground);
        //render show template with that campground
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
