'user strict'

var port = 8888;
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  user = require('./control/user'),
  home = require('./control/home'),
  path = require('path'),
  fs = require('fs');

app.set('views','./static/pages');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname,'./static')));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// app.use(cookieParser());
// app.use(express.session({
//   resave: true, 
//   saveUninitialized: false,
//   secret: 'appuser'
// }));
// app.use(function(req,res,next){
//   if (!req.session.user) {
//     if(req.url=="/login"){
//       next();
//     }
//     else
//     {
//       res.redirect('/login');
//     }
//   } else if (req.session.user) {
//     next();
//   }
// });

app.get('/', home.init);
app.get('/index', home.init);

app.get('/login', user.login);

// app.get('/singin', user.singin);

app.get('/siginout', user.siginout);
app.get('*', 
  function(req, res){  
  res.render('404',{})  
});

// TODO: add login vertify

app.post('/singin', urlencodedParser, user.singin);
var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("网址访问路径 http://%s:%s", host, port);
});
