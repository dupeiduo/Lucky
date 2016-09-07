'user strict'
const formidable = require('formidable'),
  fs = require("fs"),
  db = require("../config/database");

exports.login = function (req, res) {
  res.render('login',{});
}
exports.siginout = function(req, res) {
  req.session.user = null;
  res.redirect('/login');
}
exports.singin = function (req, res) {
  // GET Method
  // var account = req.query.account;
  // var pwd = req.query.password;
  var account = req.body.account;
  var pwd = req.body.password;
  
  console.log(account + pwd);
  selectUserInfo(account, pwd, function(results) {
    if (results.length > 0) {
      // TODO: set session
      // var user = {user: account};
      // req.session.user = user;
      console.log(results[0]);
      res.render('home', {
        name: results[0].name,
        email: results[0].email,
        phone: results[0].phone,
        account: results[0].account
      });
    } else {
      res.redirect('/login');
    }
  });
}
var selectUserInfo = function(account, pwd, callback) {
  try{
    var _db = new db.DB();
    var strSql = 'SELECT * FROM user WHERE account="'+ account +
      '" and password=' + pwd;
    _db.doSelect( strSql,callback );
    _db = null; 
  } catch(err) {
    console.log(err.error_msg);
  }
}