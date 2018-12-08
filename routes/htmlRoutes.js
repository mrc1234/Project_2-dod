var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) { 
      res.render("index");
    });
  

  // Load index page
  app.get("/index", function(req, res) { 
    res.render("index");
  });

  // Load survey page
  app.get("/survey", function(req, res) { 
    res.render("survey");
  });



  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
