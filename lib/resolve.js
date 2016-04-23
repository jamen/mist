'use strict';

var $ = require('cheerio');

module.exports = function resolve(item, opts) {
  opts = opts || {};
  var el = opts.el || 'span';
  var me = $(el, '<' + el + '></' + el + '>');

  if (item.type === 'item') {
    me.html(item.value);
  }

  if (item.children.length) {
    var list = $(el, '<' + el + '></' + el + '>');
    if (item.type === 'base') {
      list = me;
    }
    list.addClass('list');

    var max = item.children.length;
    for (var i = 0; i < max; i++) {
      list.append(resolve(item.children[i], opts));
    }

    if (item.type === 'item') {
      me.append(list);
    }
  }

  return $.html(me);
};
