var Sculptor = require('../lib/sculptor.js'),
    vowsSculptor = new Sculptor('vows');

vowsSculptor.addCommands({
  'A Vows sculptor': function () {
    return new Sculptor('vows');
  },
  'processing a set of commands': function () {
    return '';
  },
  'outputs an expected suite': function () {
  }
});

vowsSculptor.addBatch(require('./sculptor.tests.json'));

vowsSculptor['export'](module);