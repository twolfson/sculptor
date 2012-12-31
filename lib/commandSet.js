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
          compositionFns = composedNames.map(function (name) {
            var fn = this.get(name);
            return {'name': name, 'fn': fn};
          }, this);

      // Save the command as a composition of functions -- leave implementation up to engine
      command = compositionFns;
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