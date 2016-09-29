var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: "126", 
  auth: {
      user: 'du_peiduo@126.com',
      pass: 'mail126'
  }
});

exports.send = function(mailOptions) {
  mailOptions = mailOptions ? mailOptions : {
      from: '"Du Peiduo" <du_peiduo@126.com>', // login user must equel to this user
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