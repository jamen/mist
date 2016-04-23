'use strict';

module.exports = function transform(input, opts) {
  opts = opts || {};
  var level = 0;
  var output = {type: 'base', value: '', children: []};
  output.parent = output;
  var current = output;

  var max = input.length;
  for (var i = 0; i < max; i++) {
    // Blocks
    if (input[i].type === 'linebreak') {
      i++;
      var indents = 0;
      while (input[i] && input[i].type === 'indent') {
        indents++;
        i++;
      }

      if (input[i] && input[i].type !== 'declare') {
        var last = current.children;
        last[last.length - 1].value += ' ' + input[i].value;
        continue;
      }

      if (!indents || indents === level) {
        continue;
      }

      if (indents < level) {
        level--;
        current = current.parent;
      }

      if (indents > level) {
        level++;
        current = current.parent.children[current.parent.children.length - 1];
      }
    }

    if (input[i].type === 'text') {
      current.children.push({
        type: 'item',
        value: input[i].value,
        children: [],
        parent: current
      });
    }
  }

  return output;
};
