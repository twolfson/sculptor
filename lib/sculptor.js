var assert = require('assert'),
    engines = {};

/**
 * Constructor function for building tests
 * @param {String} engineName Engine to sculpt from
 * @param {Object} [options] Options to pass through to suite
 */
function Sculptor(engineName, options) {
  // Grab and localize the engine
  var engine = engines[engineName];

  // Assert the engine exists
  assert(engine, 'Engine "' + engineName + '" could not be found/loaded. Please make sure that all dependencies have been met and engine exists.');

  // Save the engine for later
  this.engine = engine;

  // TODO: We might want a batch constructor for easy management for engines that lack this
  // Generate and save our suite
  this.suite = engine.createSuite(options);
}
Sculptor.prototype = {
  'addBatch': function (inBatch) {
    // Parse and save the batch
    var engine = this.engine,
        outBatch = engine.parseBatch(inBatch);
    this.suite.addBatch(outBatch);
  },
  'addCommand': function (name, fn) {
    // Add command to engine
    this.engine.addCommand(name, fn);
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
  'export': function () {
    // Export the suite
    // TODO: Is this really what we want?
    // TODO: We should aim for a lower level batch generator and not adding suites at runtime
    return this.suite['export'].apply(this.suite, arguments);
  }
};

// Helper method for adding engines
function addEngine(name, engine) {
  engines[name] = engine;
}
Sculptor.addEngine = addEngine;

// Add the vows engine
var vows = require('./engines/vows');
addEngine('vows', vows);

// Export Sculptor
module.exports = Sculptor;