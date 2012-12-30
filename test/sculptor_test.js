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

  // Second batch
  // TODO: Aliasing is not yet available but coming soon
  // 'Additionally, it can handle multiple batches': 'A skeletal test',
  'Additionally, it can handle multiple batches': function (topic) {
    return this;
  },
  'and re-use tests': function (topic) {
    return topic;
  },
  // 'via aliasing and directly': 'can be processed via Sculptor',
  'via aliasing and directly': function () {
    return 1;
  },

  // Third batch
  // TODO: Actually use partitioning and chaining
  // 'Also, chaining': 'A skeletal test',
  // 'and partitioning': 'A skeletal test',
  // 'of test items is possible': 'A skeletal test'
};