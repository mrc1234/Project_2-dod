var db = require("../models");

module.exports = function(app) { 
  // Load index page

  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/index", function(req, res) {
    res.render("index");
  });

  //html routes for the sign up page
  app.get("/signup", function(req, res) {
    res.render("signup");
  });
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
  //load the in file user's info for the pre-exist user
  app.get("/users/:id", function(req, res) {
    db.User_info.findOne({ where: { id: req.params.id } }).then(function(
      dbUser
    ) {
      res.render("userpage", { user: dbUser });
    });
  });
};
