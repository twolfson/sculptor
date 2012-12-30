// Using optimist determine engine, test files, and command files
var optimist = require('optimist'),
    argv = optimist
             ['default']('engine', 'vows')
             ['default']('dir', 'test')
             .boolean('no-hints')
             ['default']('no-hints', false)
             .argv;

// Set up fallbacks for testFiles and commandFiles
var engine = argv.engine,
    dir = argv.dir,
    testGlob = argv['test-files'] || dir + '/*.{test,tests}.{js,json}',
    commandGlob = argv['command-files'] || dir + '/*.' + engine + '.js';

// Expand test and command file paths via glob
var glob = require('glob'),
    testFiles = glob.sync(testGlob),
    commandFiles = glob.sync(commandGlob);

// Load in lib and create a new sculptor
var Sculptor = require(__dirname + '/../lib/sculptor'),
    options = {'hints': !argv['no-hints']},
    engineSculptor = new Sculptor(engine, options);

// Register the commandFiles then test files
commandFiles.forEach(function (commandFile) {
  var commands = require(process.cwd() + '/' + commandFile);
  engineSculptor.addCommands(commands);
});
testFiles.forEach(function (testFile) {
  var tests = require(process.cwd() + '/' + testFile);
  engineSculptor.addTests(tests);
});

// Export/run the tests
// TODO: We will need to chain this with vows -- see if we can do it sans chaining (e.g. `run`)
engineSculptor['export'](module);

// TODO: In README notes, outline engine, dir, test-files, command-files
// TODO: In README notes, mention that [glob] is used to expand file paths

// TODO: Export/run the tests -- this might be different depending on engines
// TODO: We might want to start handling engines as done in consolidate.js