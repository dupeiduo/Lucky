'user strict'
const fs = require('fs');
var user = require('./user'),
  log = require('../config/log').log,
  userInfo = [];
user.emitter.on('userInfo', function(userinfo) {
  userInfo = userinfo;
});
exports.init = function (req, res) {
  if (req.session.user) {
    var isLogin = true;
    var userName = userInfo.name;
  } else {
    var isLogin = false;
    var userName = '';
  }
  var files = fs.readdirSync('./static/images');
  res.render('pages/index',{
    title: 'Home page',
    contentTitle: 'Welcome to the first page.',
    description: "this page don't need login",
    imgs: files,
    isLogin: isLogin,
    userName: userName
  }); 
}
exports.home = function (req, res) {
  log(userInfo);
  res.render('pages/home', {
    title: 'Hi,' + userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
    account: userInfo.account
  });
}