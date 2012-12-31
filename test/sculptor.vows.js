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
  'Also, chaining': ['one', 'times twenty', 'plus one'],
  // Partitioning is when a test is broken down further -- it is not possible to demonstrate
  'and partitioning': 'pass',
  'of test items is possible': function (topic) {
    console.log('aaa');
    assert.equal(topic, 21, 'One times twenty plus one equals twenty-one');
  },
  'one': function (topic) {
    return 1;
  },
  'times twenty': function (topic) {
    return topic * 20;
  },
  'plus one': function (topic) {
    console.log('bbb');
    return topic + 1;
  },

  // Alias for next
  'equals twenty-one': 'of test items is possible',

  // Assert chaining
  'Test for': ['one', 'times twenty', 'plus one'],
  'chaining on asserts': 'equals twenty-one'
};