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
  // If we see something, spit it out
  // When we enter an export item
    // Silence the export
  // When we leave an export item
    // Unmute the export

// TODO: Edge case, what if they do var a = fn; then module.exports = a;
// Technically, there is no harm in this since `a` is never invoked. Just dirty.

// require command files normally
  // Convert all exported items to strings?

// Read in test files and process via engine
  // VANILLA JS

// Generate the content with our `pre` and actual content
  // Spit out as JS or intepret.