var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
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
    }
  ];

  res.render("campgrounds", { campgrounds });
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.log("YELPCAMP server has started");
});
