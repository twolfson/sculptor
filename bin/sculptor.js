// Using optimist determine engine, test files, and command files
var optimist = require('optimist'),
    argv = optimist
             ['default']('engine', 'vows')
             ['default']('dir', 'test')
             .argv;

// Set up fallbacks for testFiles and commandFiles
var engine = argv.engine,
    dir = argv.dir,
    testGlob = argv['test-files'] || dir + '/*.test.{js,json}',
    commandGlob = argv['command-files'] || dir + '/*.' + engine + '.js';

// Expand test and command file paths via glob
var glob = require('glob'),
    testFiles = glob.sync(testGlob),
    commandFiles = glob.sync(commandGlob);

// Load in lib and create a new sculptor
var sculptor = require('./lib/sculptor'),
    engineSculptor = new Sculptor(engine);

// Register the testFiles and commandFiles
testFiles.forEach(function (testFile) {
  var tests = require(testFile);
  engineSculptor.addTests(tests);
});
commandFiles.forEach(function (commandFile) {
  var commands = require(commandFile);
  engineSculptor.addCommands(commands);
});

// Export/run the tests
// TODO: We will need to chain this with vows -- see if we can do it sans chaining (e.g. `run`)
engineSculptor['export'](module);

// TODO: In README notes, outline engine, dir, test-files, command-files
// TODO: In README notes, mention that [glob] is used to expand file paths

// TODO: Export/run the tests -- this might be different depending on engines
// TODO: We might want to start handling engines as done in consolidate.js