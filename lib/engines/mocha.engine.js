var Mocha = require('mocha'),
    traverse = require('traverse'),
    namesToNodes = require('../utils/namesToNodes');

// TODO: Collect TestParser for mocha and vows into one class
// This would have default methods for `expandTopic`, `topic`, `expandLeaf`, `leaf`
// which would be overridable on an engine by engine basis (either by instance or protype -- mixin/override ftw =D

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
            // Otherwise, save the command as the before
              node.before = topic;
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
  // Create a new mocha
  var mocha = new Mocha();

  // Generate a TestParser
  var commands = params.commands,
      parser = new TestParser(commands);

  // Iterate over the tests
  var tests = params.tests;
  tests.forEach(function (inBatch) {
    // Interpret the test
    var outBatch = parser.parse(inBatch);

    // Recursively walk the test
    function walkNode(node) {
      // If there is a beforeFn, run it as `before`
      var beforeFn = node.before;
      if (beforeFn) {
        before(beforeFn);
      }

      // Iterate and recurse over each part
      var keys = Object.getOwnPropertyNames(node);
      keys.forEach(function recursivelyWalkNode (key) {
        var subnode = node[key],
            description = key;

        // If the subnode is an object, continue diving
        if (typeof subnode === 'object') {
          describe(description, function walkSubnode () {
            walkNode(subnode);
          });
        } else {
        // Otherwise, execute `it`
          var fn = subnode;
          it(key, fn);
        }
      });
    }
    walkNode(outBatch);
  });
}

// Expose all the things
module.exports = {
  'process': process,
  'traverse': traverse,
  'TestParser': TestParser
};