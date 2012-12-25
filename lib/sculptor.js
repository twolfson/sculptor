var engines = {},
    commands = {};

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
}
Sculptor.prototype = {
  'addBatch': function (inBatch) {
    // Parse and save the batch
    var engine = this.engine,
        outBatch = engine.parseBatch(inBatch);
    this.suite.addBatch(outBatch);
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

// Helper method to add new commands
function addCommand(name, fn) {
  commands[name] = fn;
}
function addCommands(commandObj) {
  var keys = Object.getOwnPropertyNames(commandObj);
  keys.forEach(function (key) {
    addCommand(key, commandObj[key]);
  });
}
Scupltor.addCommand = addCommand;
Scupltor.addCommands = addCommands;

// Export Sculptor
module.exports = Sculptor;