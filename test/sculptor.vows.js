var assert = require('assert');
module.exports = {
  // First batch
  'A skeletal test': function () {
    // Get it? ;D
    return this;
  },
  'can be processed via Sculptor': function () {
    return 1;
  },
  'to assert items': function (topic) {
    assert.equal(topic, 1, 'One is equal to one');
  },

  // Utility functions
  'pass': function (topic) {
    return topic;
  },

  // Second batch
  'Additionally, it can handle multiple batches': 'A skeletal test',
  'and re-use tests': 'pass',
  'via aliasing and directly': 'can be processed via Sculptor',

  // Third batch
  // Chain together some addition functions
  'Also, chaining': ['one', 'timesTwenty', 'plusOne'],
  // Partitioning is when a test is broken down further -- it is not possible to demonstrate
  'and partitioning': 'pass',
  'of test items is possible': function (topic) {
    console.log('asserting');
    assert.equal(topic, 21, 'One times twenty plus one equals twenty-one');
  },
  'one': function (topic) {
    return 1;
  },
  'timesTwenty': function (topic) {
    return topic * 20;
  },
  'plusOne': function (topic) {
    return topic + 1;
  }
};