# sculptor

Library for sculpting "framework/language agnostic" BDD tests

Sculptor is a test runner wrapper for any testing framework. Currently supported frameworks are: [vows][vows], [mocha][mocha] (planned), [testling][testling] (planned), [selenium+mocha][selenium] (planned).

[vows]: http://vowsjs.org/
[mocha]: http://visionmedia.github.com/mocha/
[testling]: http://testling.com/
[selenium]: https://github.com/Camme/webdriverjs

Tests are broken into two pieces:
- Outline, a barebones [JSON][json] [BDD][bdd] description of what is being tested

```javascript
// test/fruit.tests.json
{
  "An apple": {
    "is red": true,
    "and shiny": true
  }
}
```

- Content, an implementation of the tests listed within the outline

```javascript
// test/fruit.vows.js
{
  'An apple': function () {
    return new Apple();
  },
  'is red': function (apple) {
    assert.equal(apple.color, 'red');
  },
  'and shiny': function (apple) {
    assert(apple.shiny);
  }
}
```

This yields the following benefits:
- Common format for easier transitioning between implementations.
- Chaining/aliasing of commands is trivial to add (and has been).
- Description/purpose of tests is succint and clear.

[json]: http://json.org/
[bdd]: http://en.wikipedia.org/wiki/Behavior-driven_development
[examples]: https://github.com/twolfson/sculptor/tree/master/examples

## Usages

Sculptor can be install via npm
```
sudo npm install -g sculptor
```

Then, tests can be run via the command line
```shell
sculptor
```

## Documentation
### CLI usage
Sculptor is run via the command line. It takes the following parameters
- `--engine {{engine}}` - Test engine to run under (e.g. `vows`, `mocha`, `testling`, `selenium+mocha`)
    - Default: `vows`. Only one available currently is `vows`, all others are in development.
- `--dir {{dir}}` - Directory to read in files and command files from
    - Default: `test`
- `--test-files {{testFiles}}` - [Minimatch pattern][minimatch] to find test files by. This is the `outline` piece as described above.
    - Default: `test/*.tests.{js,json}`. This means any files inside of `test` ending with `.tests.js` or `.tests.json`.
- `--command-files {{commandFiles}}` - [Minimatch pattern][minimatch] to find command files by. This is the `content` piece as described above.
    - Default: `test/*.{{engine}}.js`. If the `engine` is vows, this means any files inside of `test` ending with `.vows.js`.
- `--no-hints` - Turn off hinting of when commands are not found. By default, this is disabled and you are notified `Command could not be found: {{commandName}}`.

[minimatch]: https://github.com/isaacs/minimatch

### Outline format
Outlines can either be an object or array of objects. Each object is run through the engine's interpretter (loading content into the outline) and added as a batch to be run. Then, all batches are run.

Asynchronous behavior (e.g. parallel vs series) will change depending on the engine.

### Content format
Content files are expected to be an object with strings that match the test names and values which are functions to run at each level.

In the case that keys do not line up, Sculptor has been designed to notify you via a `console.log` (see [CLI usage#no-hints](#cli-usage)).

#### Aliasing/Chaining commands
A bonus feature is the ability to alias and chain commands. Aliasing is done by using a string of the command you would like to alias.
```js
{
  'A circle': function () {
    return new Circle();
  },
  'A round object': 'A circle'
}
```

Chaining is performed by using an array of strings. These strings are broken out into a nested object for interprettation by the engine.
```js
{
  'A banana': function () {
    return new Banana();
  },
  'when peeled': function (banana) {
    return banana.peel();
  },
  'A peeled banana': ['A banana', 'when peeled']
}
```

***Warning:*** Chaining at the leafs of tests can be confusing. Instead of the chain being asserted, they are run as nested objects meaning **only the last item** in the chain is an assertion.

## Examples
An implementation of Sculptor can be found within the [test][test] folder.

A pre-Sculptor implementation can be found within [node-jsmin-sourcemap][jsmin-sourcemap].

[test]: https://github.com/twolfson/sculptor/tree/master/test
[jsmin-sourcemap]: https://github.com/twolfson/node-jsmin-sourcemap/tree/master/tests

Additionally, to make my life easier, I use an object between my topics. This makes them order agnostic and easily chainable.
```js
// Outline
{
  'a': {
    'b': {
      'some assertion': true
    }
  },
  'b': {
    'a': {
      'some assertion': true
    }
  }
}

// Content
{
  'a': function (topic) {
    topic = topic || {};
    topic.a = 1;
    return topic;
  },
  'b': function (topic) {
    topic = topic || {};
    topic.b = 1;
    return topic;
  },
  'some assertion': function (topic) {
    assert.equal(topic.a, topic.b);
  }
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint your code using [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## License
Copyright (c) 2012 Todd Wolfson
Licensed under the MIT license.
