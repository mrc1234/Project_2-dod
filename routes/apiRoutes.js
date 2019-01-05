var db = require("../models");
var passport = require("../config/passport");
//AWS
var AWS = require('aws-sdk');
var uuid = require('uuid');

// var keyName = require("../public/js/survey");  
//--this line above causes the following error;
// Users/jaipy724/code/ucf/projects/Project_2-dod/public/js/survey.js:1
// (function (exports, require, module, __filename, __dirname) { $(document).ready(function () {
//                                                               ^
// ReferenceError: $ is not defined

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });
  // Get all examples
  // Get all users
  app.get("/api/users", function (req, res) {
    db.user.findAll({}).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // Create a new user
  app.post("/api/newuser", function (req, res) {
    console.log(req.body);
    db.user.create(req.body).then(function (dbuser) {
      res.json(dbuser);
    });
  });

  // create the new post for the survey questions
  app.post("/api/newinfo", function (req, res, next) {
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

  // -----------------------------------------------
  // Upload file selected in Survey page to AWS(S3)
  // -----------------------------------------------
  // Reference:
  // Amazon Getting Started in Node.js
  // https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html
  // Note: This code doesn't use Policy and Signature, creates a new Amazon S3 bucket and uploads an object to the bucket
  //       Once object is uploaded then we can see the created bucket name and a message in console log like below:
  //       >> bucketName: project2-3d257603-df4d-42c3-8395-040192083c8e
  //       >> Successfully uploaded data to project2-3d257603-df4d-42c3-8395-040192083c8e/hello_world.txt
  //

  app.post("/api/upload", function (req, res) {
    console.log(req.body);
    // Create unique bucket name
    var bucketName = 'project2-' + uuid.v4();

    // Upload file name (object key)
    var keyName = 'hello_world.txt';

    console.log("bucketName: " + bucketName);

    // Create a promise on S3 service object
    var bucketPromise = new AWS.S3({ apiVersion: '2006-03-01' }).createBucket({ Bucket: bucketName }).promise();

    // Handle promise fulfilled/rejected states
    bucketPromise.then(
      function (data) {
        // Create params for putObject call
        var objectParams = { Bucket: bucketName, Key: keyName, Body: 'Hello World!' }; //<--Body means the content of the file.
        // Create object upload promise
        var uploadPromise = new AWS.S3({ apiVersion: '2006-03-01' }).putObject(objectParams).promise();
        uploadPromise.then(
          function (data) {
            console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
          });
      }).catch(
        function (err) {
          console.error(err, err.stack);
        });
  });

};
