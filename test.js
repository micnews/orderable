var test = require('tape');
var Orderable = require('./');
var concat = require('concat-stream');
var Readable = require('stream').Readable;

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

test('stream', function(t){
  var o = Orderable();
  setImmediate(function(){
    o.set(0, 'foo');
    o.set(1, emits(['b', 'a', 'r']))
    o.set(2, 'baz');
    o.set(3, null);
  });
  o.pipe(concat(function(res){
    t.equal(res, 'foobarbaz');
    t.end();
  }));
});

function emits(arr){
  var i = 0;
  var r = Readable();
  r._read = function(){
    r.push(arr[i++]);
  };
  return r;
}
