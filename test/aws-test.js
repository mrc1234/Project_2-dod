//
//  NOT YET
//

// Instsll
// npm install ejs

// import entire SDK
var AWS = require("aws-sdk");
// import AWS object without services
var AWS = require("aws-sdk/global");
// import individual service
var S3 = require("aws-sdk/clients/s3");

var uuid = require("uuid");

AWS.config.update({ accessKeyId: 'AKIAINJGXQDAZ2ON2BDA', secretAccessKey: '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' });
var bucket = new AWS.S3({ params: { Bucket: 'project2dod' } });

var fileChooser = document.getElementById('file-chooser');
var button = document.getElementById('upload-button');
var results = document.getElementById('results');

button.addEventListener('click', function () {
    var file = fileChooser.files[0];
    if (file) {
        results.innerHTML = '';
        console.log("found that file")
        var params = { Key: file.name, ContentType: file.type, Body: file };
        bucket.putObject(params, function (err, data) {
            results.innerHTML = err ? 'ERROR!' : 'UPLOADED.';
        });
    } else {
        results.innerHTML = 'Nothing to upload.';
        console.log("nothing to upload")
    }
}, false);