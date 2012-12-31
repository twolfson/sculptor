var traverse = require('traverse'),
    vows = require('vows');

/**
 * Parser of test objects
 * @param {Object} commands All commands that we can process by
 * @returns {Object} Processed set of commands
 */
function TestParser(commands) {
  this.commands = commands;
}
TestParser.prototype = {
  // The heartbeat of the engine
  'parse': function (batch) {
    // Traverse over the batch
    var commands = this.commands;
    traverse(batch).forEach(function traverseBatch (node) {
      var key = this.key;

      // If there is a key
      if (key) {
        // Look up the command for it
        var command = commands.get(key);

        // If there is a command
        if (command) {
          // If the node is an object
          if (typeof node === 'object') {
            // Add it as a topic
            var topic = node.topic || command;

            // DEV: Wrap the topic inside of a try/catch for debugging
            node.topic = function () {
              var retVal;
              try {
                retVal = topic.apply(this, arguments);
              } catch (e) {
                console.error(e);
              }
              return retVal;
            };
          } else {
            // Otherwise, save it over the node itself
            node = command;
          }
        }
      }

      // Return the node
      return node;
    });

    // Return the batch
    return batch;
  }
};

/**
 * Processor for vows
 * @param {Object} params
 * @param {String} [params.name] Name of the test suite
 * @param {Object} params.commands Commands to interpret with
 * @param {Object[]} params.tests Array of test objects to run
 * @param {Object} params.module Module to export onto
 */
function process(params) {
  // TODO: We could build a class for handling each part of this process but order is kind of critical
  // (i.e. createSuite, createParser, parseTests, export)
  // Grab options from params and create our suite
  var options = params.options,
      suiteName = options.name || '',
      suite = vows.describe(suiteName);

  // Generate a TestParser
  var commands = params.commands,
      parser = new TestParser(commands);

  // Iterate over the tests
  var tests = params.tests;
  tests.forEach(function (inBatch) {
    // Interpret the test
    var outBatch = parser.parse(inBatch);

    // Add it to the test suite
    suite.addBatch(outBatch);
  });

  // Export the test to module
  var module = params.module;
  suite['export'](module);
}

// TODO: Expose vows
// TODO: Expose traverse
// TODO: Expose process
// TODO: Expose parser

// Expose all the things
module.exports = {
  'process': process,
  'vows': vows,
  'traverse': traverse,
  'TestParser': TestParser
};