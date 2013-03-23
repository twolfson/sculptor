var assert = require('assert');
module.exports = {
  // Utility functions
  'pass': function () {
    return topic || {};
  },

  // First batch
  'A skeletal test': 'pass',
  'can be processed via Sculptor': function () {
    this.one = 1;
  },
  'to assert items': function () {
    assert.equal(this.one, 1, 'One is equal to one');
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
  'of test items is possible': function () {
    assert.equal(this.sum, 21, 'One times twenty plus one equals twenty-one');
  },
  'one': function () {
    this.sum = 1;
  },
  'times twenty': function () {
    this.sum *= 20;
  },
  'plus one': function () {
    this.sum += 1;
  },

  // Alias for next
  'equals twenty-one': 'of test items is possible',

  // Assert chaining
  'Test for': 'pass',
  'chaining on asserts': ['one', 'times twenty', 'plus one', 'equals twenty-one'],

  // Multi-level and multiple assertions
  'We also': function () {
    this.topic = {'color': 'red'};
  },
  'support asserting': function () {
    this.topic.shiny = true;
  },
  'at multiple levels': function () {
    this.topic.crunchy = true;
  },
  'and multiple times': function () {
    this.topic.fruit = true;
  },
  'within the': function () {
    assert(topic.fruit, 'The topic is a fruit');
  },
  'same level': function () {
    assert(topic.crunchy, 'The topic is crunchy');
  },
  'assert here': function () {
    assert(topic.shiny, 'The topic is shiny');
  },
  'assert there': function () {
    assert.notEqual(topic.color, 'green', 'The topic is not green');
  },
  'assert everywhere': function () {
    assert.equal(topic.color, 'red', 'The topic is red');
  },

 // Asynchronous items, chaining, and assertions{
  'Lastly, we support asynchronous items': function (done) {
    var that = this;
    setTimeout(function () {
      this.firstCalled = true;
      done(null);
    }, 1);
  },
  'async1': function (done) {
    var that = this;
    setTimeout(function () {
      that.async1 = that.firstCalled;
      done(null);
    }, 1);
  },
  'async2': function (done) {
    var that = this;
    setTimeout(function () {
      that.async2 = that.async1;
      done(null);
    }, 1);
  },
  'async3': function (done) {
    var that = this;
    setTimeout(function () {
      that.async3 = that.async2;
      done(null);
    }, 1);
  },
  'asyncAssert': function () {
    assert(this.async3, 'Async assert was called after async1, async2, async3 were called in order');
  },
  'asynchronous command chains': ['async1', 'async2'],
  'and asynchronous leaf chains': ['async3', 'asyncAssert'],
  'assertions cannot be asynchronous': function () {
    assert(this.firstCalled, 'Async assert was called after asynchronous topic');
  }
};