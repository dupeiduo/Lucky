var nodemailer = require('nodemailer'),
  config = require('../config').config;

var transporter = nodemailer.createTransport({
  service: config.mail_server, 
  auth: {
    user: config.mail_account,
    pass: config.mail_pwd
  }
});

exports.send = function(mailOptions) {
  mailOptions = mailOptions ? mailOptions : {
    from: '"Du Peiduo" <'+ config.mail_account +'>', // login user must equel to this user
    to: 'du_peiduo@163.com', 
    subject: 'Title Nodejs Send',
    text: 'Some simple words.', 
    html: '<b>The main content of the mail. You have successfully logged in to Nodejs.</b>' 
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
}