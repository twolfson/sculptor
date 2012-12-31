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
  // TODO: Actually use partitioning and chaining
  'Also, chaining': ['add1', 'add2', 'add3'],
  // Partitioning is when a test is broken down further -- it is not possible to demonstrate
  'and partitioning': 'pass',
  'of test items is possible': function (topic) {
    assert.equal(topic, 6, 'One plus two plus three equals six');
  },
  'add1': function (topic) {
    topic = topic || 0;
    return topic + 1;
  },
  'add2': function (topic) {
    return topic + 2;
  },
  'add3': function (topic) {
    return topic + 3;
  }
};