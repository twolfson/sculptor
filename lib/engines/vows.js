var traverse = require('traverse'),
    vows = require('vows'),
    commands = {};

var vowsEngine = {
  'createSuite': function (options) {
    // Fallback options
    options = options || {};

    // Grab name from options and generate suite
    var name = options.name || '',
        suite = vows.describe(name);

    // Return the suite
    return suite;
  },
  'addCommand': function (name, fn) {
    commands[name] = fn;
  },
  'parseBatch': function (batch) {
    // Traverse over the batch
    traverse(batch).forEach(function traverseBatch (node) {
      var key = this.key;

      // If there is a key
      if (key) {
        // Look up the command for it
        var command = commands[key];

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
module.exports = vowsEngine;
