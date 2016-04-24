'use strict';

var EOL = require('os').EOL;

module.exports = function tokenize(input, opts, recurse) {
  opts = opts || {};
  recurse = recurse || {output: [], index: 0};
  var output = recurse.output;
  var index = recurse.index;
  var subject = input.slice(index).toString();
  var test;

  if (index >= input.length) {
    return output;
  }

  var comment = opts.comment || '#';
  if (!(input.indexOf(comment, index) - index)) {
    recurse.index += comment.length;
    output.push({
      type: 'comment',
      value: comment
    });

    return tokenize(input, opts, recurse);
  }

  var indent = opts.indent || '  ';
  if (!(input.indexOf(indent, index) - index)) {
    recurse.index += indent.length;
    output.push({
      type: 'indent',
      value: indent
    });

    return tokenize(input, opts, recurse);
  }

  var bullet = opts.bullet || '-';
  if (!(input.indexOf(bullet, index) - index)) {
    recurse.index += bullet.length;
    output.push({
      type: 'bullet',
      value: bullet
    });

    return tokenize(input, opts, recurse);
  }

  var linebreak = opts.EOL || EOL || '\n';
  if (!(input.indexOf(linebreak, index) - index)) {
    recurse.index += linebreak.length;
    output.push({
      type: 'linebreak',
      value: linebreak
    });

    return tokenize(input, opts, recurse);
  }

  var whitespace = opts.whitespace || ' ';
  if (!(input.indexOf(whitespace, index) - index)) {
    recurse.index += linebreak.length;
    output.push({
      type: 'whitespace',
      value: whitespace
    });

    return tokenize(input, opts, recurse);
  }

  var item = opts.item || /^(.+)$/m;
  test = subject.match(item);
  if (test) {
    recurse.index += test[1].length;
    output.push({
      type: 'item',
      value: test[1]
    });

    return tokenize(input, opts, recurse);
  }
};
