// Reference:
// https://qiita.com/ms2sato/items/f73a02f2ac14361247c3
// S3へ直接ファイルをアップロードする。Node.js版
// the source: https://gist.github.com/ms2sato/7336318
// This is supposed to work with aws-test-1230.html

var moment = require('moment');
var crypto = require('crypto');

function createS3bucket(params) {

    function base64_encode(val) {
        var b = new Buffer(val);
        return b.toString('base64');
    }

// For IAM user
// Access key id: AKIAINJGXQDAZ2ON2BDA
// Secret access key: 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
    var accesskey = 'AKIAINJGXQDAZ2ON2BDA' // TODO
    var secret = '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'; // TODO
    var bucket = 'project2aws'; // TODO

    var key = '/Users/jaipy724/Desktop/main.png'; // TODO

    var aminlater = moment(new Date().getTime() + 1000 * 60); //a minit later

    var expiration = aminlater.utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
    var acl = 'public-read'; // set acl (private | public-read | public-read-write | authenticated-read | bucket-owner-read | bucket-owner-full-control)
    var status = '200'; // return this status code when upload success.

    var ctype = params['ctype'];
    var clength = params['clength'];

    var policy = {
        "expiration": expiration,
        "conditions": [
            {"bucket": bucket},
            {"key": key},
            {"acl": acl},
            {"success_action_status": status},
            {"Content-Type": ctype},
            ["content-length-range", clength, clength]
        ]
    };

    var encodedPolicy = base64_encode(JSON.stringify(policy));
    var sh = crypto.createHmac('sha1', secret);
    sh.update(encodedPolicy);
    var signature = sh.digest('base64');

    var ret = {
        'url': 'http://' + bucket + '.s3.amazonaws.com/',
        'form': {
            'AWSAccessKeyId': accesskey,
            'signature': signature,
            'policy': encodedPolicy,
            'key': key,
            'acl': acl,
            'success_action_status': status,
            'Content-Type': ctype
        }
    };

    //sconsole.log('ret', ret);

    return ret;
}

exports.upload = function (req, res) {
    var ret = createS3bucket(req.query);
    res.json(ret);
};