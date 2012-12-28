var Sculptor = require('../lib/sculptor.js'),
    vowsSculptor = new Sculptor('vows');

vowsSculptor.addCommands({
  'A Vows sculptor': function (topic) {
    return {'sculptor': new Sculptor('vows')};
  },
  // TODO: We could have that this test running is a validation of sculptor itself (how meta)
  'processing a set of commands': function (topic) {
    topic.sculptor.addCommands({

    });
    return topic;
  },
  'outputs an expected suite': function () {
  }
});

vowsSculptor.addBatch(require('./sculptor.tests.json'));

vowsSculptor['export'](module);