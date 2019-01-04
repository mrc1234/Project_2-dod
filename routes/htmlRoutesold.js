// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

//var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load index page
  app.get("/index", function(req, res) {
    res.render("index");
  });

  //html routes for the sign up page
  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/login", function(req, res) {

    if (req.user) {
      res.redirect("/survey");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  })
  //html to show the outcome after user answered survey
  app.get("/result", function(req, res) {
    res.render("result");
  });
  // Load the survey page
  app.get("/survey", function(req, res) {
    res.render("survey");
  });

  // Load the services (APIs) page
  app.get("/services", function(req, res) {
    res.render("services");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
