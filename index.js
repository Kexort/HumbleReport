var axios = require('axios');
var cheerio = require('cheerio');
var fs = require('fs');
var util = require('util');
var g2a = require('./g2a.js');

const humbleKeysUrl = "https://www.humblebundle.com/home/keys";
const humbleOrderUrl = "https://www.humblebundle.com/api/v1/order/%s?all_tpkds=true";

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

var options2 = {
    url: '',
    method: 'GET',
    headers: headers
};

function getOrderDetails(orderID){
  options2.url = util.format(humbleOrderUrl, orderID);
  axios(options2).then((response) => {
    response.data["tpkd_dict"]["all_tpks"].forEach((elem) => {
      g2a.priceCheck(elem["human_name"]).then((response2) => {
        var price = 0;
        if(response2.data["products"].length > 0){
          price = response2.data["products"][0]["minPrice"];
        }
        console.log(elem["human_name"], elem["steam_app_id"], "redeemed_key_val" in elem, price);
      });
    });
  });
}

function getKeyList(){
  axios(options).then((response) => {
      var $ = cheerio.load(response.data);
      var scripts = $('script').filter(function() {
        return ($(this).html().indexOf('var gamekeys') > -1);
      });
      const matchkeys = scripts.first().html().match(/var gamekeys = (.*);/);
      var keys = JSON.parse(matchkeys[1]);
      keys.forEach((elem) => {
        console.log(elem);
        getOrderDetails(elem);
      })
  });
}
//getOrderDetails('axzRXRbdzFhq8YZM');
getKeyList();
