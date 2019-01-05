// 
// Reference: 
// https://stackoverflow.com/questions/11240127/uploading-image-to-amazon-s3-with-html-javascript-jquery-with-ajax-request-n
// https://dev.classmethod.jp/cloud/aws-s3-direct-upload/

// This code is along with aws-test-0101.js

// Progress:
// 1/1 Add "var Base64 = require('js-base64').Base64;"
// 1/2 Add "var crypto = require('crypto');" and code from aws-test-1230.js  
// ==> now I can get Policy and Signature from this code
// ==> But these don't work in aws-test-0102.html, it fails with "Invalid Policy: Invalid JSON."
//

//================
// Policy
//================
var Base64 = require('js-base64').Base64;
var crypto = require('crypto');
var secret = "Wk36HkLZ+ZEpDXh1Q8BpGjLwO3SZerIffag4feTA";

POLICY_JSON = {
    "expiration": "2020-12-01T12:00:00.000Z",
    "conditions": [
        { "bucket": "project2aws" },
        ["starts-with", "$key", ""],
        { "acl": "private" },
        ["starts-with", "$Content-Type", ""],
        ["content-length-range", 0, 524288000]
    ]
};
var policyBase64 = Base64.encode(JSON.stringify(POLICY_JSON));
console.log("policyBase64: " + policyBase64)

//Policy base64 (output):
//eyJleHBpcmF0aW9uIjoiMjAyMC0xMi0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W3siYnVja2V0IjoicHJvamVjdDJhd3MifSxbInN0YXJ0cy13aXRoIiwiJGtleSIsIiJdLHsiYWNsIjoicHJpdmF0ZSJ9LFsic3RhcnRzLXdpdGgiLCIkQ29udGVudC1UeXBlIiwiIl0sWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCw1MjQyODgwMDBdXX0=

//================
// Signature
//================
// the following original code doesn't work with 

//var signature = b64_hmac_sha1(secret, policyBase64);
//b64_hmac_sha1(secret, policyBase64);
//console.log( signature);

// --> ReferenceError: b64_hmac_sha1 is not defined

// Try the following code from aws-test-1230.js
// and this works!!!
var sh = crypto.createHmac('sha1', secret);
sh.update(policyBase64);
var signature = sh.digest('base64');
console.log("signature: " + signature);

// Output
// policyBase64: eyJleHBpcmF0aW9uIjoiMjAyMC0xMi0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W3siYnVja2V0IjoicHJvamVjdDJhd3MifSxbInN0YXJ0cy13aXRoIiwiJGtleSIsIiJdLHsiYWNsIjoicHJpdmF0ZSJ9LFsic3RhcnRzLXdpdGgiLCIkQ29udGVudC1UeXBlIiwiIl0sWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCw1MjQyODgwMDBdXX0=
// signature: aUMCYS/5+tH+N8T4ROMnjnohvuI=


//================
// looking for a Workaround
//================
    // https://angular-file-upload.appspot.com/
    //
    // As per this website
    // When 
    // bucket name = project2aws
    // AWS access key = AKIAINJGXQDAZ2ON2BDA 
    // AWS secret key = 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
    // success_action_redirect = http://localhost/success.html
    // Then
    // policy: eyAiZXhwaXJhdGlvbiI6ICIyMDIwLTEyLTAxVDEyOjAwOjAwLjAwMFoiLAogICAgICAgICAgICAiY29uZGl0aW9ucyI6IFsKICAgICAgICAgICAgeyJidWNrZXQiOiAicHJvamVjdDJkb2QifSwKICAgICAgICAgICAgWyJzdGFydHMtd2l0aCIsICIka2V5IiwgIiJdLAogICAgICAgICAgICB7ImFjbCI6ICJwcml2YXRlIn0sICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgIFsic3RhcnRzLXdpdGgiLCAiJENvbnRlbnQtVHlwZSIsICIiXSwKICAgICAgICAgICAgWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsIDAsIDUyNDI4ODAwMF0KICAgICAgICAgICAgXQogICAgICAgICAgfTs=
    // signature: rFiPv4i1NNgBxpVldQcohawjaGQ=
    //
    // ==> "aws-test-0102.html"  using these policy and sig failed with "InvalidPolicyDocument"
    // so these values don't work

