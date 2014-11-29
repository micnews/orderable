var Readable = require('stream').Readable;
var inherits = require('util').inherits;
var read = require('stream-read');

module.exports = Orderable;
inherits(Orderable, Readable);

function Orderable(){
  if (!(this instanceof Orderable)) return new Orderable();
  Readable.call(this, { objectMode: true });
  this._buf = [];
  this._idx = 0;
}

Orderable.prototype.set = function(i, chunk){
  this._buf[i] = chunk;
  this.emit('readable');
};

Orderable.prototype._read = function(){
  var self = this;
  var value = this._buf[this._idx];

  if (typeof value == 'undefined') {
    this.once('readable', this._read.bind(this));
  }
  else if (value === null) {
    this.push(null);
  }
  else if (typeof value.pipe == 'function') {
    read(value, function(err, chunk){
      if (err) return self.emit('error', err);
      if (chunk === null) {
        self._idx++;
        self._read();
      }
      else self.push(chunk);
    });
  }
  else {
    this._idx++;
    this.push(value);
  }
};

