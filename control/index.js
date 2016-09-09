'user strict'
const fs = require('fs');

exports.init = function (req, res) {
  var files = fs.readdirSync('./static/images');
  res.render('pages/index',{
    title: 'Home page',
    contentTitle: 'Welcome to the first page.',
    description: "this page don't need login",
    imgs: files
  }) 
}
