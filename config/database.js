'use strict'
var mysql = require('mysql');  

function DB() {
  if (this instanceof DB) {
    this.connect();
  } else {
    throw {
      error_msg: 'Please new the constructor of DB like this: "var _db = new DB();"'
    }
  }
}
DB.prototype.connect = function() {
  this.DATABASE = 'philip';
  this.client = mysql.createConnection({  
    user: 'root',  
    password: '123456',  
  });  

  this.client.connect(handleError);
  this.client.on('error' ,handleError);
  this.client.query("use " + this.DATABASE);

  function handleError (err) {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        this.connect();
      } else {
        console.error(err.stack || err);
      }
    }
  }
}
DB.prototype.doSelect = function(sql, callback) {
  var self = this;
  self.client.query(  
    sql,  
    function (err, results) {  
      if (err) {  
        throw err;  
      }  
      if(results && typeof callback ==='function')
      {
        callback(results);
      }    
      self.client.end();  
    }  
  ); 
}
DB.prototype.doInsert = function(sql, params, callback) {
  var self = this;
  self.client.query(
    sql, 
    params,
    function (err, results) {
      if(err){
        throw err; 
      }       
      if(results && typeof callback ==='function')
      {
        callback(results);
      }    
      self.client.end();
    }
  );
}
DB.prototype.doUpdate = function(sql, params, callback) {
  var self = this;
  self.client.query(
    sql, 
    params,
    function (err, results) {
      if(err){
        throw err; 
      }       
      if(results && typeof callback ==='function')
      {
        callback(results);
      }    
      self.client.end();
    }
  );
}
DB.prototype.doDelete = function(sql, callback) {
  var self = this;
  self.client.query(
    sql, 
    function (err, results) {
      if(err){
        throw err; 
      }       
      if(results && typeof callback ==='function')
      {
        callback(results);
      }    
      self.client.end();
    }
  );
}
exports.DB = DB;
// you can use it anywhere
var selectUserInfo = function() {
  try{
    var _db = new DB();
    // test the error message
    // DB();
    var strSql = 'SELECT name, email, phone FROM user ';
    _db.doSelect(
      strSql,
      function(results) {
        for(var i = 0; i < results.length; i++){
          console.log("%s\t%s\t%d", results[i].name, results[i].email, results[i].phone);
        };
      }
    );
    _db = null; 
  } catch(err) {
    console.log(err.error_msg);
  }
}
// selectUserInfo();

var insertUser = function() {
  try{
    var _db = new DB();
    var strSql = 'INSERT INTO user ' +
      '(account, password, name, email, phone) VALUES(?,?,?,?,?)';
    var params = ['km', '123', 'km', 'km@126.com', 123456];
    _db.doInsert(
      strSql,
      params,
      function(results) {
        console.info(results);
      }
    );
    _db = null; 
  } catch(err) {
    console.log(err.error_msg);
  }
}
// insertUser();

var updateUser = function() {
  try{
    var _db = new DB();
    var strSql = 'UPDATE user SET name = ?, email = ? WHERE ID = ?';
    var params = ['Eric', 'Eric@126.com', 4];
    _db.doUpdate(
      strSql,
      params,
      function(results) {
        console.info(results);
      }
    );
    _db = null; 
  } catch(err) {
    console.log(err.error_msg);
  }
}
// updateUser();

var deleteUser = function() {
  try{
    var _db = new DB();
    var strSql = 'DELETE FROM user WHERE ID = 4';
    _db.doDelete(
      strSql,
      function(results) {
        console.info(results);
      }
    );
    _db = null; 
  } catch(err) {
    console.log(err.error_msg);
  }
}
// deleteUser();
