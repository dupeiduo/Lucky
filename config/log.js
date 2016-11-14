'user strict'

exports.log = function(msg) {
  if (typeof msg === 'object') {
    console.info(msg);
  } else if (typeof msg === 'string') {
    console.log(msg);
  }
}