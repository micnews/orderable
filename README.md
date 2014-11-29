
# orderable

  A readable stream to which you can in random order push chunks or sub-streams with an index, and they will be emitted by index ascending.

  [![build status](https://secure.travis-ci.org/micnews/orderable.svg)](http://travis-ci.org/micnews/orderable)

## Example

```js
var Orderable = require('orderable');

var o = Orderable();

setTimeout(function(){
  o.set(0, 'foo\n');
}, Math.random() * 1000);

setTimeout(function(){
  o.set(1, createStringStream(['b', 'a', 'r', '\n']));
}, Math.random() * 1000);

setTimeout(function(){
  o.set(2, 'baz\n');
  o.set(3, null);
}, Math.random() * 1000);

o.pipe(process.stdout);
```

  Always outputs:

```bash
$ node example.js
foo
bar
baz
$
```

## Installation

```bash
$ npm install orderable
```

## API

### Orderable()

  Create an orderable stream.

### Orderable#set(index, chunk)

  Push `chunk` onto the internal buffer at `index`. Pass `chunk=null` to mark the end of a stream. You can pass readable streams as well.

  You can also do this at the beginning, like:

```js
o.set(3, null);
o.set(0, 'foo');
o.set(1, 'bar');
o.set(2, 'baz');
```

## License

  MIT

