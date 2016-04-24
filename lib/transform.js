'use strict';

module.exports = function transform(input, opts, recurse) {
  opts = opts || {};
  recurse = recurse || {
    base: {type: 'base', children: [], parent: null},
    index: 0,
    level: 0
  };
  var output = recurse.output = recurse.output || recurse.base;
  var i = recurse.index;
  var item = input[i] || null;

  if (!item) {
    return recurse.base;
  }

  if (item.type === 'whitespace') {
    recurse.index++;
    return transform(input, opts, recurse);
  }

  if (item.type === 'comment') {
    while (input[i] && input[i].type !== 'linebreak') {
      i++;
    }
    recurse.index = i;
    return transform(input, opts, recurse);
  }

  if (item.type === 'linebreak') {
    i++;
    var indents = 0;
    while (input[i] && input[i].type === 'indent') {
      indents++;
      i++;
    }

    if (!indents && input[i] && input[i].type === 'linebreak') {
      recurse.index++;
      return transform(input, opts, recurse);
    }

    recurse.index = --i;
    var change = indents - recurse.level;

    if (change) {
      var max = Math.abs(change);
      var neg = change < 0;
      for (var a = 0; a < max; a++) {
        recurse.level += neg ? -1 : 1;
        if (neg) {
          recurse.output = output.parent;
        } else {
          var t = output.children;
          recurse.output = t[t.length - 1];
        }
      }
    }
  }

  if (item.type === 'bullet') {
    i++;
    while (
      input[i] &&
      (input[i].type === 'whitepsace' ||
      input[i].type === 'indent')
    ) {
      i++;
    }
    recurse.index = ++i;

    input[i].children = [];
    input[i].parent = output;
    output.children.push(input[i]);
  }

  if (item.type === 'item') {
    var x = output.parent.children;
    x[x.length - 1].value += ' ' + item.value;
    i++;
  }

  recurse.index++;
  return transform(input, opts, recurse);
};
