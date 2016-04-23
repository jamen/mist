#!/usr/bin/env node
'use strict';
var mist = require('../lib');
var opts = require('minimist')(process.argv.slice(2));

process.stdin.on('data', function(data) {
  var out = mist.render(data, opts) + '\n';
  process.stdout.write(out);
});
