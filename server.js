'user strict'

var port = 8888,
  sslport = 8000;
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  urlencodedParser = bodyParser.urlencoded({ extended: false }),
  index = require('./control/index'),
  user = require('./control/user'),
  path = require('path'),
  fs = require('fs'),
  session = require('express-session'),
  cookieParser = require('cookie-parser'),
  cookieSession = require('cookie-session'),
  https = require('https'),
  options = {
    key: fs.readFileSync('pem/rsa_private_key.pem'),
    cert: fs.readFileSync('pem/cacert.pem')
  };

app.set('views','./static');
app.set('view engine', 'jade');

app.use(session({
  resave: true, 
  saveUninitialized: false, 
  secret: 'userLogin',
  key: 'userLogin',
  cookie: { maxAge: 2 * 3600 * 1000}
}));


app.use(express.static(path.join(__dirname,'./static')));

app.get('/', index.init);
app.get('/index', index.init);

app.use(user.authenticate);

app.get('/login', function (req, res) {
  res.render('pages/login', { title: 'Login page' });
});

app.post('/login', urlencodedParser, user.login);

app.get('/logout', user.logout);

app.get('/regist', function (req, res) {
  res.render('pages/regist', { title: 'Regist page' });
});

app.post('/regist', urlencodedParser, user.regist);

app.get('/home', index.home);

app.get('*', function(req, res){  
  res.render('404',{});
});

// var server = app.listen(port, function () {

//   var host = server.address().address;
//   var port = server.address().port;

//   console.log("网址访问路径 http://127.0.0.1:%s", port);
// });

https.createServer(options, (req, res) => {
  app.handle( req, res );
}).listen(sslport);
