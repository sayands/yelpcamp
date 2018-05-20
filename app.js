var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var campgrounds = [
  {
    name: "Darjeeling",
    image: "http://outgotrip.com/wp-content/uploads/2017/08/DARJEELING.jpg"
  },
  {
    name: "Darjeeling",
    image: "http://outgotrip.com/wp-content/uploads/2017/08/DARJEELING.jpg"
  },
  {
    name: "Darjeeling",
    image: "http://outgotrip.com/wp-content/uploads/2017/08/DARJEELING.jpg"
  },
  {
    name: "Darjeeling",
    image: "http://outgotrip.com/wp-content/uploads/2017/08/DARJEELING.jpg"
  },
  {
    name: "Darjeeling",
    image: "http://outgotrip.com/wp-content/uploads/2017/08/DARJEELING.jpg"
  },
  {
    name: "Darjeeling",
    image: "http://outgotrip.com/wp-content/uploads/2017/08/DARJEELING.jpg"
  }
];

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", { campgrounds });
});

app.post("/campgrounds", function(req, res) {
  // get data from form and add to campgrounds array
  var { name, image } = req.body;

  var newCampground = { name, image };
  campgrounds.push(newCampground);

  //redirect back to campgrounds page
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.log("YELPCAMP server has started");
});
