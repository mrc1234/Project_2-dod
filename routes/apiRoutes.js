var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/users", function(req, res) {

    db.user.findAll({}).then(function(dbUser) {

      res.json(dbUser);
    });
  });

  // Create a new example
  app.post("/api/newuser", function(req, res) {
    db.user.create(req.body).then(function(dbuser) {
      res.json(dbuser);
    });
  });

    // create the new post for the survey questions
    app.post("/api/newinfo", function(req, res) {
      console.log(req.body);
      db.user_info.create(req.body).then(function(dbinfo) {
        res.json(dbinfo);
      });
    });

 // Update if user want to change their survey answers in their account to explore more ways
 app.put("/api/newinfo", function(req, res) {
  db.user_info
    .update(req.body, {
      where: {
        id: req.body.id
      }
    })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});   

  // Delete a post by id
  app.delete("/api/newinfo/:id", function(req, res) {
    db.user_info
    .destroy({ where: { id: req.params.id } })
    .then(function(dbinfo) {
      res.json(dbinfo);
    });
  });
};
