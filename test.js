var test = require('tape');
var Orderable = require('./');
var Readable = require('stream').Readable;

function concat(stream, cb){
  var chunks = [];
  stream.on('data', chunks.push.bind(chunks));
  stream.on('error', cb);
  stream.on('end', cb.bind(null, null, chunks));
}

test('forwards', function(t){
  var o = Orderable();
  setImmediate(function(){
    o.set(0, 'foo');
    o.set(1, 'bar');
    o.set(2, null);
  });
  concat(o, function(err, res){
    t.error(err);
    t.deepEqual(res, ['foo', 'bar']);
    t.end();
  });
});

test('backwards', function(t){
  var o = Orderable();
  setImmediate(function(){
    o.set(2, null);
    o.set(1, 'bar');
    o.set(0, 'foo');
  });
  concat(o, function(err, res){
    t.error(err);
    t.deepEqual(res, ['foo', 'bar']);
    t.end();
  });
});

test('mixed', function(t){
  var o = Orderable();
  setImmediate(function(){
    o.set(1, 'bar');
    o.set(2, null);
    o.set(0, 'foo');
  });
  concat(o, function(err, res){
    t.error(err);
    t.deepEqual(res, ['foo', 'bar']);
    t.end();
  });
});

test('stream', function(t){
  var o = Orderable();
  setImmediate(function(){
    o.set(0, 'foo');
    o.set(1, emits(['b', 'a', 'r']))
    o.set(2, 'baz');
    o.set(3, null);
  });
  concat(o, function(err, res){
    t.error(err);
    t.deepEqual(res, ['foo', 'b', 'a', 'r', 'baz']);
    t.end();
  });
});

function emits(arr){
  var i = 0;
  var r = Readable();
  r.setEncoding('utf8');
  r._read = function(){
    r.push(arr[i++]);
  };
  return r;
}
