// TODO: Open source this -- just need to find a name
/**
 * Convert array of names into array of trees of objects depth-first defined by their name
 * @example ['a', 'b', 'c'] -> [{'a': {'b': {'c': {}}}}, {'b': {'c': {}}}, {'c': {}}]
 * @example ['a', 'b', 'c'] -> [{'a': {'b': {'c': {}}}}, $0.a, $1.b]
 * @param {String[]} Array of names
 * @returns {Object[]} Array of objects nested in the order of their names
 */
function namesToNodes(names) {
  // Create a root node and save it as the leaf
  var root = {},
      leaf = root,
      retArr = [root];

  // Iterate over the names
  names.forEach(function (name) {
    // Generate the next leaf
    var nextLeaf = {};

    // Save our next leaf under the current leaf
    leaf[name] = nextLeaf;

    // Overwrite the leaf with the next leaf
    leaf = nextLeaf;

    // Save nextLeaf to retArr
    retArr.push(nextLeaf);
  });

  // Return the retArr
  return retArr;
}

// Export namesToNodes
module.exports = namesToNodes;