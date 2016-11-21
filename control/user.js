'user strict'
const formidable = require('formidable'),
  fs = require("fs"),
  db = require("../plugins/database"),
  log = require('../plugins/log').log,
  index = require('./index'),
  events = require('events'), 
  mail = require("../plugins/mailer"),
  library = require("../plugins/common"),
  emitter = new events.EventEmitter();

exports.emitter = emitter;

exports.authenticate = function(req, res, next){
  if (!req.session.user) {
    if(req.url == "/login" || req.url == '/' || req.url == '/index' || req.url == "/regist") {
      next();
    } else {
      res.redirect('/login');
    }
  } else if (req.session.user) {
    next();
  }
}

exports.logout = function(req, res) {
  req.session.user = null;
  res.redirect('/login');
}

exports.login = function (req, res) {
  var account = req.body.account;
  var pwd = req.body.password;
  pwd = library.md5(pwd);
  selectUserInfo(account, pwd, function(results) {
    if (results.length > 0) {
      // set session
      var user = { user: account, password: pwd };
      req.session.user = user;
      emitter.emit('userInfo', results[0]);
      res.redirect('/home');
      log(results[0].email);
      // mail.send({
      //   from: '"Du Peiduo" <du_peiduo@126.com>', 
      //   to: results[0].email, 
      //   subject: 'Login success',
      //   text: 'Some simple words.', 
      //   html: '<b>The main content of the mail</b>'
      // });
    } else {
      res.redirect('/login');
    }
  });
}
exports.regist = function(req, res) {
  var email = req.body.email;
  var account = req.body.account;
  var pwd = req.body.password;
  var pwdconfirm = req.body.pwdconfirm;
  if (pwdconfirm == pwd) {
    pwd = library.md5(pwd);
    insertUser(account, pwd, email, function (results) {
      emitter.emit('userInfo', {name: account, email: email, phone: '', account: account});
      var user = { user: account, password: pwd };
      req.session.user = user;
      res.redirect('/home');
      log(results.insertId);
    });
  } else {
    log('err');
  }
}
var selectUserInfo = function(account, pwd, callback) {
  try{
    var _db = new db.DB();
    var strSql = 'SELECT * FROM user WHERE account="'+ account +
      '" and password="' + pwd + '"';
    _db.doSelect( strSql,callback );
    _db = null; 
  } catch(err) {
    log(err.error_msg);
  }
}
var insertUser = function(account, password, email, callback) {
  try{
    var _db = new db.DB();
    var strSql = 'INSERT INTO user ' +
      '(account, password, name, email, phone) VALUES(?,?,?,?,?)';
    var params = [account, password, account, email, 123456];
    _db.doInsert(
      strSql,
      params,
      callback
    );
    _db = null; 
  } catch(err) {
    log('err:' + err.error_msg);
  }
}