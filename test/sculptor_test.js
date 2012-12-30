module.exports = {
  'A Vows sculptor': function (topic) {
    return {'sculptor': new Sculptor('vows')};
  },
  'processing a set of commands': function (topic) {
    topic.sculptor.addCommands({

    });
    return topic;
  },
  'outputs an expected suite': function () {
  }
};

vowsSculptor.addBatch(require('./sculptor.tests.json'));

vowsSculptor['export'](module);