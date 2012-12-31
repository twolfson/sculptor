var assert = require('assert'),
    engines = {};

// TODO: TEST ME OUT ON jsmin-sourcemap

/**
 * Constructor function for building tests
 * @param {String} engineName Engine to sculpt from
 * @param {Object} [options] Options for sculptor
 * @param {Boolean} [options.hints=true] Console.log hints about if tests/commands are unused
 * @param {Mixed} [options.engineOptions] Options for engine during suite creation
 */
function Sculptor(engineName, options) {
  // Grab and localize the engine
  var engine = engines[engineName];

  // Assert the engine exists
  assert(engine, 'Engine "' + engineName + '" could not be found/loaded. Please make sure that all dependencies have been met and engine exists.');

  // Fallback options
  options = options || {};

  // Save the engine and options for later
  this.engine = engine;
  this.options = options;

  // Save tests and commands for later
  this.tests = [];
  this.commands = {};
}
Sculptor.prototype = {
  'addTest': function (test) {
    // Save the test for later
    this.tests.push(test);
  },
  'addTests': function (tests) {
    // If this is not an array, upcast it to one
    if (!Array.isArray(tests)) {
      tests = [tests];
    }

    // Iterate over the tests and add them as batches
    tests.forEach(this.addTest, this);
  },
  'addCommand': function (name, fn) {
    // Save command for later
    this.commands[name] = fn;
  },
  'addCommands': function (commandObj) {
    // Iterate over the keys of the object
    var keys = Object.getOwnPropertyNames(commandObj),
        that = this;
    keys.forEach(function (key) {
      // Add in each command
      that.addCommand(key, commandObj[key]);
    });
  },
  'export': function (module) {
    // Create a plethora of info for the suite
    var params = {
          'tests': this.tests,
          'commands': this.commands,
          'options': this.options.engineOptions || {},
          'module': module
        };

    // Process the suite
    return this.engine.process(params);
  }
};

// Helper method for adding engines
function addEngine(name, engine) {
  engines[name] = engine;
}
Sculptor.addEngine = addEngine;

// Add the vows engine
var vows = require('./engines/vows.engine.js');
addEngine('vows', vows);

// Export Sculptor
module.exports = Sculptor;