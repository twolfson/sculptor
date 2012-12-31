// TODO: Open source this -- just need to find a name
/**
 * Convert array of names into a tree of objects depth-first defined by their name
 * @example ['a', 'b', 'c'] -> {'a': {'b': {'c': {}}}}
 * @param {String[]} Array of names
 * @returns {Object} retObj Object containing properties of interest
 * @returns {Object} retObj.root Root containing an object keyed via the first name
 * @returns {Object} retObj.leaf Empty object created as a child of the last name
 */
function namesToNodes(names) {
  // Create a root node and save it as the leaf
  var root = {},
      leaf = root;

  // Iterate over the names
  names.forEach(function (name) {
    // Generate the next leaf
    var nextLeaf = {};

    // Save our next leaf under the current leaf
    leaf[name] = nextLeaf;

    // Overwrite the leaf with the next leaf
    leaf = nextLeaf;
  });

  // Generate a retObj
  var retObj = {'root': root, 'leaf': leaf};
  return retObj;
}

// Export namesToNodes
module.exports = namesToNodes;