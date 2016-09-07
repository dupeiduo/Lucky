'user strict'
const formidable = require('formidable'),
  fs = require("fs");

exports.init = function (req, res) {
  res.render('home',{}) 
}
