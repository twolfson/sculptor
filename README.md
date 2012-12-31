# sculptor

Library for sculpting "framework/language agnostic" BDD tests

Sculptor is a test runner wrapper for any testing framework. Currently supported frameworks are: [vows][vows], [mocha][mocha] (planned), [testling][testling] (planned), [selenium+mocha][selenium] (planned).

[vows]: http://vowsjs.org/
[mocha]: http://visionmedia.github.com/mocha/
[testling]: http://testling.com/
[selenium]: https://github.com/Camme/webdriverjs

## Getting Started
Install the module via: `sudo npm install sculptor -g`

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

Then, the test is run via the command line
```shell
sculptor # Runs test via vows
```

## Benefits
- Implementations have a common format which allows for easier transitioning
- With this text based association, chaining/aliasing is trivial to add (and has been)
- Intent and purpose of tests are very clear since they are described entirely separate

[json]: http://json.org/
[bdd]: http://en.wikipedia.org/wiki/Behavior-driven_development
[examples]: https://github.com/twolfson/sculptor/tree/master/examples

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

#### Chaining
A bonus feature

// TODO: README notes on chaining at object leafs, we make assumption of topic -> topic -> assert
// We equally could assert -> assert -> assert however, we have chosen against it -- honestly, it is up to the engine implementors

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint your code using [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## License
Copyright (c) 2012 Todd Wolfson
Licensed under the MIT license.
