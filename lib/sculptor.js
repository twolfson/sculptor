var engines = {};

/**
 * Constructor function for building tests
 * @param {String} engineName Engine to sculpt from
 * @param {Object} [options] Options to pass through to suite
 */
function Sculptor(engineName, options) {
  // Grab and localize the engine
  var engine = engines[engineName];

  // Assert the engine exists

  // Save the engine for later
  this.engine = engine;

  // TODO: We might want a batch constructor for easy management for engines that lack this
  // Generate and save our suite
  this.suite = engine.createSuite(options);

  // Create a list for storing commands
  // TODO: Contemplate commands some more -- are they engine specific?
  // Are they processed by sculptor?
  this.commands = {};
}
Sculptor.prototype = {
  'addBatch': function (inBatch) {
    // Parse and save the batch
    var engine = this.engine,
        outBatch = engine.parseBatch(inBatch);
    this.suite.addBatch(outBatch);
  },
  'addCommand': function (name, fn) {
    this.commands[name] = fn;
  },
  'addCommands': function (commandObj) {
    var keys = Object.getOwnPropertyNames(commandObj),
        that = this;
    keys.forEach(function (key) {
      that.addCommand(key, commandObj[key]);
    });
  },
  'export': function () {
    // Export the suite
    return this.suite['export']();
  }
};

// Helper method for adding engines
function addEngine(name, engine) {
  engines[name] = engine;
}
Sculptor.addEngine = addEngine;

// Export Sculptor
module.exports = Sculptor;