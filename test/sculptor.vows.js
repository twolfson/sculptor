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
  }
};