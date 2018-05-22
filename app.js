var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment");
seedDB = require("./seeds");

//seedDB();

var { credentials } = require("./config");
var { user, password } = credentials;
mongoose.connect(
  `mongodb://${user}:${password}@ds129770.mlab.com:29770/yelpcamp-dev`
);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

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
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
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
  res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
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

// =====================================================
// COMMENTS ROUTES
// =====================================================

app.get("/campgrounds/:id/comments/new", function(req, res) {
  // find campground by Id
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground });
    }
  });
});

app.post("/campgrounds/:id/comments", function(req, res) {
  //lookup campground using ID
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      //create new comment
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          //connect new comment to campground
          campground.comments.push(comment);
          campground.save();

          //redirect campground show page
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.log("YELPCAMP server has started");
});
