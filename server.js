'user strict'

var port = 8888;
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  index = require('./control/index'),
  user = require('./control/user'),
  path = require('path'),
  fs = require('fs');

app.set('views','./static');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname,'./static')));
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', index.init);
app.get('/index', index.init);

app.get('/login', user.login);

// GET
// app.get('/singin', user.singin);
// POST
app.post('/singin', urlencodedParser, user.singin);

app.get('/siginout', user.siginout);
app.get('*', 
  function(req, res){  
  res.render('404',{})  
});

// TODO: add login vertify

var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("网址访问路径 http://%s:%s", host, port);
});
