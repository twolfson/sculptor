var traverse = require('traverse'),
    vows = require('vows'),
    namesToNodes = require('../utils/namesToNodes');

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
    var commands = this.commands,
        that = this;
    traverse(batch).forEach(function traverseBatch (node) {
      var key = this.key;

      // If there is a key
      if (key) {
        // Look up the command for it
        var command = commands.get(key);

        // If there is a command
        if (command) {
          // Define variables here to please JSHint
          var commandNames,
              nodeArr,
              lastIndex,
              lastNode,
              lastName;

          // If the node is an object
          if (typeof node === 'object') {
            // Add it as a topic
            var topic = command;

            // If the command is an array of commands
            if (Array.isArray(topic)) {
              // TODO: Consolidate this with other "if (Array.isArray" section
              // Convert the names into nodes
              commandNames = topic.map(function (topicObj) { return topicObj.name; });
              nodeArr = namesToNodes(commandNames);
              lastIndex = commandNames.length - 1;
              lastNode = nodeArr[lastIndex];
              lastName = commandNames[lastIndex];

              // // Displace this node as the leaf node
              // // TODO: This should work but traverse is giving me shit =(
              // lastNode[lastName] = node;

              // Displace node's children to the Leaf node
              var keys = Object.getOwnPropertyNames(node),
                  leaf = lastNode[lastName];
              keys.forEach(function (key) {
                leaf[key] = node[key];
              });

              // Overwrite node with root node
              node = nodeArr[0];
            } else {
            // Otherwise, save the command as the topic
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
            }
          } else {
          // Otherwise
            // If the command is an array of commands
            if (Array.isArray(command)) {
              // Convert the names into nodes
              commandNames = command.map(function (topicObj) { return topicObj.name; });
              nodeArr = namesToNodes(commandNames);
              lastIndex = commandNames.length - 1;
              lastNode = nodeArr[lastIndex];
              lastName = commandNames[lastIndex];

              // Replace leaf with node
              lastNode[lastName] = node;

              // Overwrite node with root node
              node = nodeArr[0];
            } else {
            // Otherwise, save it over the node itself
              node = command;
            }
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

  // // Export the test to module
  // var module = params.module;
  // suite['export'](module);

  // TODO: [Iter 2] Generate test, upload directly via node

  var assert = require('assert'),
      fs = require('fs'),
      request = require('request');

  // TODO: Assert options.username and options.password

  var output = fs.readFileSync(__dirname + '/../../testling_poc/example_test.js', 'utf8');

  // Send the request
  var authStr = encodeURIComponent(options.username) + ':' + encodeURIComponent(options.password),
      browsers = 'iexplore/7.0,iexplore/8.0,chrome/13.0',
      url = 'http://' + authStr + '@testling.com/?browsers=' + browsers,
      requestOptions = {
        'url': url,
        'body': output
      };
  request.put(requestOptions, function (err, res, body) {
    console.log(arguments);
  });
}

// Expose all the things
module.exports = {
  'process': process,
  'vows': vows,
  'traverse': traverse,
  'TestParser': TestParser
};