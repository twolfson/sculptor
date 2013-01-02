// Load in lib and create a new sculptor
var Sculptor = require(__dirname + '/../lib/sculptor'),
    engine = 'testling',
    options = {'hints': !argv['no-hints']},
    engineSculptor = new Sculptor(engine, options);

// Register the test and command files
var testFiles = [__dirname + '/tests.js'],
    commandsFiles  = [__dirname + '/commands.js'];
testFiles.forEach(function (testFile) {
  var tests = require(testFile);
  engineSculptor.addTests(tests);
});
commandFiles.forEach(function (commandFile) {
  var commands = require(commandFile);
  engineSculptor.addCommands(commands);
});

// Export/run the tests
engineSculptor['export'](module);