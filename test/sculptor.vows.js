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
  'Also, chaining': 'A skeletal test',
  'and partitioning': 'A skeletal test',
  'of test items is possible': 'A skeletal test'

  // Tests to add back to .json
  // , {
  //   "Additionally, it can handle multiple batches": {
  //     "and re-use tests": {
  //       "via aliasing and directly": {
  //         "to assert items": true
  //       }
  //     }
  //   }
  // }, {
  //   "Also, chaining": {
  //     "and partitioning": {
  //       "of test items is possible": true
  //     }
  //   }
  // }
};