var test = require('tape');
var Orderable = require('./');
var concat = require('concat-stream');

test('forwards', function(t){
  var o = Orderable();
  setImmediate(function(){
    o.set(0, 'foo');
    o.set(1, 'bar');
    o.set(2, null);
  });
  o.pipe(concat(function(res){
    t.equal(res, 'foobar');
    t.end();
  }));
});

test('backwards', function(t){
  var o = Orderable();
  setImmediate(function(){
    o.set(2, null);
    o.set(1, 'bar');
    o.set(0, 'foo');
  });
  o.pipe(concat(function(res){
    t.equal(res, 'foobar');
    t.end();
  }));
});

test('mixed', function(t){
  var o = Orderable();
  setImmediate(function(){
    o.set(1, 'bar');
    o.set(2, null);
    o.set(0, 'foo');
  });
  o.pipe(concat(function(res){
    t.equal(res, 'foobar');
    t.end();
  }));
});

