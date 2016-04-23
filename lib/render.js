'use strict';

var tokenize = require('./tokenize');
var transform = require('./transform');
var resolve = require('./resolve');

module.exports = function render(input, opts) {
  return resolve(transform(tokenize(input, opts), opts), opts);
};
