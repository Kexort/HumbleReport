var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
require('request').debug = true

const humbleKeysUrl = "https://www.humblebundle.com/home/keys";

//TODO: automatic Cookie retrieve
var cookieString = fs.readFileSync('./cookies', 'utf8').toString();

const headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
    'Cookie': cookieString,
    'Accept': '/',
    'Connection': 'keep-alive'
}

const options = {
    url: humbleKeysUrl,
    method: 'GET',
    headers: headers
};


request(options, function(error, response, html){
  if(!error){
    var $ = cheerio.load(html);
    console.log(html);
  }
});
