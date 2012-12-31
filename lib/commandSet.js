/**
 * Higher level storage system for commands
 * @param {Object} [options]
 * @param {Boolean [options.hints] If true, console.log when an item cannot be found
 */
function CommandSet(options) {
  // Fallback options
  options = options || {};

  // Save options for later
  this.options = options;

  // Determine if we should be echoing hints
  this.showHints = options.hints;

  // Set up store for commands
  this.commands = {};
}
CommandSet.prototype = {
  'set': function (name, value) {
    // Save the name and value
    this.commands[name] = value;
  },
  'get': function (name) {
    // Look up the command
    var command = this.commands[name];

    // If the command is not defined
    if (command === undefined) {
      // and showHints is specified, notify the user
      if (this.showHints) {
        console.log('Command could not be found: ', name);
      }
    } else if (Array.isArray(command)) {
    // Otherwise, if the command is an array
      // Map the commands from their aliases
      var composedNames = command,
          compositionFns = composedNames.map(this.get, this);

      // Generate our composition
      command = function commandComposition () {
        // TODO: This will probably get sticky with engine implementations of functions
        // This code is intepretted from underscore.js - https://github.com/documentcloud/underscore/blob/ae3cdd3981b39246f1071216aca7438cec5fcac7/underscore.js#L696-L707
        // Collect arguments and looping vars
        var args = arguments,
            i = 0,
            len = compositionFns.length;

        // Iterate over the functions and call each one, chaining args
        for (; i < len; i++) {
          args = [compositionFns[i].apply(this, args)];
        }

        // Return the arguments passed back
        return args[0];
      };
    } else if (typeof command === 'string') {
    // Otherwise, if the command is a string
      // Look up the alias
      var aliasName = command;
      command = this.get(aliasName);
    }

    // Return the command
    return command;
  }
};

// Export CommandSet
module.exports = CommandSet;