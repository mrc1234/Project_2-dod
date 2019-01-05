// Load the SDK and UUID
// var AWS = require('aws-sdk');
// var uuid = require('uuid');
//
// ==> Error
// awssdk2.js:2 Uncaught ReferenceError: require is not defined
// 
// cause is explained below
// https://brightsign.zendesk.com/hc/en-us/community/posts/115000444494-Javascript-error-require-is-not-defined
// The require() function is not a client side function, recognized by the browser. Typically require() is used in server side NodeJS code, but there is a require.js library file that you can add...
// These guys discuss that same issue
// https://stackoverflow.com/questions/23603514/javascript-require-function-giving-referenceerror-require-is-not-defined

// current status
// need to load AWS and uuid
// option 1   use REQUIREJS
// option 2   have a separate js (server side/ client side)
//    ref: https://stackoverflow.com/questions/18831783/how-to-call-a-server-side-function-from-client-side-e-g-html-button-onclick-i


$("#apply-upload").click(function () { 
    var file = $("#upload-file").prop("files")[0];
    var keyName = file.name;
    console.log(file);
    console.log("keyName: " + keyName);

    // Create unique bucket name
    var bucketName = 'project2-' + uuid.v4();

    // Create name for uploaded object key
    // var keyName = 'hello_world.txt';

    // Create a promise on S3 service object
    var bucketPromise = new AWS.S3({ apiVersion: '2006-03-01' }).createBucket({ Bucket: bucketName }).promise();

    // Handle promise fulfilled/rejected states
    bucketPromise.then(
        function (data) {
            // Create params for putObject call
            // var objectParams = { Bucket: bucketName, Key: keyName, Body: 'Hello World!' };
            var objectParams = { Bucket: bucketName, Key: keyName };
            // Create object upload promise
            var uploadPromise = new AWS.S3({ apiVersion: '2006-03-01' }).putObject(objectParams).promise();
            uploadPromise.then(
                function (data) {
                    console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
                });
        }
    ).catch(
        function (err) {
            console.error(err, err.stack);
        }
    );
});