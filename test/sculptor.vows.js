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
    return topic || {};
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
    assert.equal(topic, 21, 'One times twenty plus one equals twenty-one');
  },
  'one': function (topic) {
    return 1;
  },
  'times twenty': function (topic) {
    return topic * 20;
  },
  'plus one': function (topic) {
    return topic + 1;
  },

  // Alias for next
  'equals twenty-one': 'of test items is possible',

  // Assert chaining
  'Test for': 'pass',
  'chaining on asserts': ['one', 'times twenty', 'plus one', 'equals twenty-one'],

  // Multi-level and multiple assertions
  'We also': function () {
    return {'color': 'red'};
  },
  'support asserting': function (topic) {
    topic.shiny = true;
    return topic;
  },
  'at multiple levels': function (topic) {
    topic.crunchy = true;
    return topic;
  },
  'and multiple times': function (topic) {
    topic.fruit = true;
    return topic;
  },
  'within the': function (topic) {
    assert(topic.fruit, 'The topic is a fruit');
  },
  'same level': function (topic) {
    assert(topic.crunchy, 'The topic is crunchy');
  },
  'assert here': function (topic) {
    assert(topic.shiny, 'The topic is shiny');
  },
  'assert there': function (topic) {
    assert.notEqual(topic.color, 'green', 'The topic is not green');
  },
  'assert everywhere': function (topic) {
    assert.equal(topic.color, 'red', 'The topic is red');
  },

  // Asynchronous items, chaining, and assertions{
  'Lastly, we support asynchronous items': function () {
    var callback = this.callback;
    callback(null, {'firstCalled': true});
  },
  'async1': function (topic) {
    var callback = this.callback;
    topic.async1 = topic.firstCalled;
    callback(null, topic);
  },
  'async2': function (topic) {
    var callback = this.callback;
    topic.async2 = topic.async1;
    callback(null, topic);
  },
  'async3': function (topic) {
    var callback = this.callback;
    topic.async3 = topic.async2;
    callback(null, topic);
  },
  'asyncAssert': function (topic) {
    assert(topic.async3, 'Async assert was called after async1, async2, async3 were called in order');
  },
  'asynchronous command chains': ['async1', 'async2'],
  'and asynchronous leaf chains': ['async3', 'asyncAssert'],
  'assertions cannot be asynchronous': function (topic) {
    assert(topic.firstCalled, 'Async assert was called after asynchronous topic');
  }
};