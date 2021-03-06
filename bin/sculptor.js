#!/usr/bin/env node
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

// Register the test and command files
testFiles.forEach(function (testFile) {
  var tests = require(process.cwd() + '/' + testFile);
  engineSculptor.addTests(tests);
});
commandFiles.forEach(function (commandFile) {
  var commands = require(process.cwd() + '/' + commandFile);
  engineSculptor.addCommands(commands);
});

// Export/run the tests
engineSculptor['export'](module);

// TODO: Export/run the tests -- this might be different depending on engines
// TODO: We might want to start handling engines as done in consolidate.js