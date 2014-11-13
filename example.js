var Orderable = require('./');

var o = Orderable();

setTimeout(function(){
  o.set(0, 'foo\n');
}, Math.random() * 1000);

setTimeout(function(){
  o.set(1, 'bar\n');
}, Math.random() * 1000);

setTimeout(function(){
  o.set(2, 'baz\n');
  o.set(3, null);
}, Math.random() * 1000);

o.pipe(process.stdout);
