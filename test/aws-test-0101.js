// 
// Reference: 
// https://stackoverflow.com/questions/11240127/uploading-image-to-amazon-s3-with-html-javascript-jquery-with-ajax-request-n
// https://dev.classmethod.jp/cloud/aws-s3-direct-upload/
// 

// This code is along with aws-test-0101-0.js
// From the js is:
// policyBase64: eyJleHBpcmF0aW9uIjoiMjAyMC0xMi0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W3siYnVja2V0IjoicHJvamVjdDJhd3MifSxbInN0YXJ0cy13aXRoIiwiJGtleSIsIiJdLHsiYWNsIjoicHJpdmF0ZSJ9LFsic3RhcnRzLXdpdGgiLCIkQ29udGVudC1UeXBlIiwiIl0sWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCw1MjQyODgwMDBdXX0=
// signature: aUMCYS/5+tH+N8T4ROMnjnohvuI=
// Access key id: AKIAINJGXQDAZ2ON2BDA
// Secret access key: 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
// bucket: "project2aws"

// Progress: 
// 
// 

var AWSAccessKeyId = "AKIAINJGXQDAZ2ON2BDA";
var policy = "eyJleHBpcmF0aW9uIjoiMjAyMC0xMi0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W3siYnVja2V0IjoicHJvamVjdDJhd3MifSxbInN0YXJ0cy13aXRoIiwiJGtleSIsIiJdLHsiYWNsIjoicHJpdmF0ZSJ9LFsic3RhcnRzLXdpdGgiLCIkQ29udGVudC1UeXBlIiwiIl0sWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCw1MjQyODgwMDBdXX0=";
var signature = "aUMCYS/5+tH+N8T4ROMnjnohvuI=";

function uploadFile() {

    // Upload file to S3
    var file = document.getElementById('file').files[0];
    var fd = new FormData();
    var key = "events/" + (new Date).getTime() + '-' + file.name;
    fd.append('key', key);
    fd.append('acl', 'public-read');
    fd.append('Content-Type', file.type);
    fd.append('AWSAccessKeyId', AWSAccessKeyId);
    fd.append('policy', policy)
    fd.append('signature', signature);

    fd.append("file", file);

    var xhr = getXMLHTTPObject();

    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);

    xhr.open('POST', 'https://project2aws.s3.amazonaws.com/', true); //MUST BE LAST LINE BEFORE YOU SEND 

    xhr.send(fd);
}

function uploadProgress(evt) {
    if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
    }
    else {
        document.getElementById('progressNumber').innerHTML = 'unable to compute';
    }
}

function uploadComplete(evt) {
    /* This event is raised when the server send back a response */
    alert("Done - " + evt.target.responseText);
}

function uploadFailed(evt) {
    alert("There was an error attempting to upload the file." + evt);
}

function uploadCanceled(evt) {
    alert("The upload has been canceled by the user or the browser dropped the connection.");
}