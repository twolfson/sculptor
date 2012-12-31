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
- Skeleton, a barebones [JSON][json] [BDD][bdd] description of what is being tested
```javascript
// test/fruit.tests.json
{
  "An apple": {
    "is red": true,
    "and shiny": true
  }
}
```

- Core, an implementation of the tests listed within the skeleton
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

## Benefits
- Implementations have a common format which allows for easier transitioning
- With this text based association, chaining/aliasing is trivial to add (and has been)
- Intent and purpose of tests are very clear since they are described entirely separate

[json]: http://json.org/
[bdd]: http://en.wikipedia.org/wiki/Behavior-driven_development
[examples]: https://github.com/twolfson/sculptor/tree/master/examples

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint your code using [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## License
Copyright (c) 2012 Todd Wolfson
Licensed under the MIT license.
