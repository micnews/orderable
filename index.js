var Readable = require('stream').Readable;
var inherits = require('util').inherits;

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
  if (typeof this._buf[this._idx] != 'undefined') {
    this.push(this._buf[this._idx++]);
  } else {
    this.once('readable', this._read.bind(this));
  }
};

