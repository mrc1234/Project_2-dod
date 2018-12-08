var db = require("../models");

module.exports = function(app) { 
  // Load index page
  app.get("/", function(req, res) { res.render("index",/*{ msg: "test"} */)
  /* db.User_info.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    }); */

  });

  app.get("/index", function(req, res) { res.render("index",/*{ msg: "test"} */)
  /* db.User_info.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    }); */

  });

  // Load survey page
  app.get("/survey", function(req, res) { res.render("survey", { msg: "survey will go here"})
});

  // Load example page and pass in an example by id
 /* app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  }); */

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
