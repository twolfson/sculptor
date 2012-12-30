// Using optimist determine engine, test files, and command files
var optimist = require('optimist'),
    argv = optimist
             ['default']('engine', 'vows')
             ['default']('dir', 'test')
             .argv;

// Set up fallbacks for testFiles and commandFiles
var engine = argv.engine,
    dir = argv.dir;

// If there is no test-files specified, use *.test.js/json
if (!argv['test-files'] ) {
  argv['test-files'] = dir + '/*.test.{js,json}';
}

// If there is no command-files specified, use *.{{engine}}.js
if (!argv['command-files'] ) {
  argv['command-files'] = dir + '/*.test.js';
}

// Load in lib
var sculptor = require('./lib/sculptor');

// TODO: In README notes, outline engine, dir, test-files, command-files
// TODO: In README notes, mention that [glob] is used to expand file paths

// TODO: Use glob to expand out file paths
// TODO: Load in tests/skeletons and commands
// TODO: Export/run the tests -- this might be different depending on engines


// vowsSculptor.addBatch(require('./sculptor.tests.json'));

// TODO: We might want to start handling engines as done in consolidate.js

// vowsSculptor['export'](module);