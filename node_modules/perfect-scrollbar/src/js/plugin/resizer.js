'use strict';

var update = require('./update');
var instances = require('./instances');
var _ = require('../lib/helper');

module.exports = function (element) {
  var i = instances.get(element);

  var onResize = function () {
    update(element);
  };

  i.event.bind(window, 'resize', _.debounce(onResize, 60));
};
