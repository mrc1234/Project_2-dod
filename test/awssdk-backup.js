//Reference:
// Amazon Getting Started in Node.js
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html
// 

// This code doesn't use Policy and Signature
// creates an Amazon S3 bucket and uploads an object to that bucket

// Progress:
// WORKING
// without using existing bucket i.e."project2aws"
//

// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('uuid');

// Create unique bucket name
var bucketName = 'project2-' + uuid.v4();
// Create name for uploaded object key
var keyName = 'hello_world.txt';

// Create a promise on S3 service object
var bucketPromise = new AWS.S3({ apiVersion: '2006-03-01' }).createBucket({ Bucket: bucketName }).promise();

// Handle promise fulfilled/rejected states
bucketPromise.then(
    function (data) {
        // Create params for putObject call
        var objectParams = { Bucket: bucketName, Key: keyName, Body: 'Hello World!' };
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