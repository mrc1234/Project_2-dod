var db = require("../models");

module.exports = function(app) {
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
  app.post("/api/newinfo", function(req, res) {
    console.log(req.body);
    db.information.create(req.body).then(function(dbinfo) {
      res.json(dbinfo);
    });
  });
};
