var assert = require('assert');

module.exports = {
  'One': function () {
    return 1;
  },
  'plus one': function (topic) {
    return topic + 1;
  },
  'is two': function (topic) {
    assert.equal(topic, 2, 'One plus one is two');
  }
};