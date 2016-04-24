#!/usr/bin/env node
'use strict';
var mist = require('../lib');
var EOL = require('os').EOL;
var opts = require('minimist')(process.argv.slice(2));

process.stdin.on('data', function(data) {
  var out = mist.render(data, opts) + EOL;
  process.stdout.write(out);
});
