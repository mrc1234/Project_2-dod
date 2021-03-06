var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });
  // Get all examples
  // Get all users
  app.get("/api/users", function(req, res) {
    db.user.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Create a new user
  app.post("/api/newuser", function(req, res) {
    console.log(req.body);
    db.user.create(req.body).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  // create the new post for the survey questions
  app.post("/api/newinfo", function(req, res, next) {
    console.log(req.body);
    db.information
      .create(req.body)
      .then(function(dbinfo) {
        res.json(dbinfo);
        next();
        //res.redirect(303, "/result");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
      });
  });
};
