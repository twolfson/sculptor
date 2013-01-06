var assert = require('assert');
var vows = require('vows');
vows.addBatch({
  "A skeletal test": {
    topic: function () {
      // Get it? ;D
      return this;
    },
    "can be processed via Sculptor": {
      topic: function () {
        return 1;
      },
      "to assert items": function (topic) {
        assert.equal(topic, 1, 'One is equal to one');
      }
    }
  }
})['export'](module);


// PROCESS:
// Read in all command files
// Any time there is a var outside of an exported function
  // TODO: Good luck detecting that
  // Copy it over
  // In fact, this extends to anything outside of a module.exports

  // Anything that is exported, save the source of
  // NOTE: THIS COULD BE DONE VIA VANILLA JS

// Read in test files and process via engine
  // VANILLA JS

// Generate the content with our `pre` and actual content
  // Spit out as JS or intepret.