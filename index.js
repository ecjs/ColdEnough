var express = require('express');
var app = express();
var request = require('request');
var compress = require('compression');

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
 
app.use(compress());

app.use(express.static(__dirname + '/public'));
app.post('/zip', function(req,res){
  request({
    uri: "http://api.wunderground.com/api/76009aee6e359b00/geolookup/q/" + req.body.lat + "," + req.body.long + ".json",
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  }, function(error, response, body) {
    var getIT = JSON.parse(body);
    res.send({city: getIT.location.city, state: getIT.location.state});
  });
});

app.post('/temperature', function(req,res){
  request({
    uri: "http://api.wunderground.com/api/76009aee6e359b00/conditions/q/" + req.body.state + "/" + req.body.city + ".json",
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  }, function(error, response, body) {
    var getIT = JSON.parse(body);
    console.log(getIT.current_observation.temp_f);
    res.send({temp: getIT.current_observation.temp_f});
  });
});

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

var server = app.listen(process.env.PORT || 5000, function(){
  console.log("Listening master..");
});
