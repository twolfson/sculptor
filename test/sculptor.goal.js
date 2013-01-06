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