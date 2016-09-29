'user strict'
const fs = require('fs');
var user = require('./user'),
  userInfo = [];
user.emitter.on('userInfo', function(userinfo) {
  userInfo = userinfo;
});
exports.init = function (req, res) {
  var files = fs.readdirSync('./static/images');
  res.render('pages/index',{
    title: 'Home page',
    contentTitle: 'Welcome to the first page.',
    description: "this page don't need login",
    imgs: files
  }) 
}
exports.home = function (req, res) {
  res.render('pages/home', {
    title: 'Hi,' + userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
    account: userInfo.account
  });
}