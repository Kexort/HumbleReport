var axios = require('axios');
var cheerio = require('cheerio');
var util = require('util');
var querystring = require("querystring");

const searchURL = "https://www.g2a.com/new/api/products/filter/?query=%s";

function priceCheck(string){
  return axios.get(util.format(searchURL, querystring.escape(string)));
}

exports.priceCheck = priceCheck;
