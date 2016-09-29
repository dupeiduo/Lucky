'user strict'
var host = '127.0.0.1',
  port = '11211';
const Memcached = require('memcached'),
  memcached = new Memcached();
memcached.connect( host + port, function( err, conn ){
  if( err ) {
     console.log( conn.server );
  }
});
var profile = {'name':'DPD', 
               'location':'Lucky', 
               'emailid':'peiduodu@gmail.com' 
               }               
memcached.set('profile', profile, 10000, function (err) { 
  if(err) throw new err;
});
memcached.get('profile', function (err, data) {
  console.log(data);
});
memcached.del('profile', function (err) { 
  if(err) throw new err;
});