var assert = require('assert');
var http = require('http');
var https = require('https');
var url = require('url');

var USER_AGENT = 'HeyWatch/2.0.0 (NodeJS)';

module.exports = {

  submit: function(configContent, apiKey, callback) {
    heywatchURL = url.parse(process.env.HEYWATCH_URL || 'https://heywatch.com');

    if(!apiKey) {
      apiKey = process.env.HEYWATCH_API_KEY;
    }

    var reqOptions = {
      hostname: heywatchURL.hostname,
      port: heywatchURL.port || (heywatchURL.protocol == 'https:' ? 443 : 80),
      path: '/api/v1/job',
      method: 'POST',
      auth: apiKey+':',
      headers: {
        'User-Agent': USER_AGENT,
        'Content-Type': 'text/plain',
        'Accept': 'application/json',
        'Content-Length': configContent.length
      }
    };

    var req = (heywatchURL.protocol == 'https:' ? https : http).request(reqOptions, function(res) {
      res.setEncoding('utf8');
      var responseString = '';

      res.on('data', function(data) {
        responseString += data;
      });

      res.on('end', function () {
        var resultObject = JSON.parse(responseString);
        if(callback) {
          callback(resultObject);
        }
      });
    });

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
      if(callback) {
        callback(null);
      }
    });

    req.write(configContent);
    req.end();
  }

}