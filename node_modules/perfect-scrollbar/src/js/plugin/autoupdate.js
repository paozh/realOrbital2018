'use strict';

var update = require('./update');
var MutationObserver = window.MutationObserver;
var instances = require('./instances');

var createDOMEvent = function (name) {
  var event = document.createEvent('Event');
  event.initEvent(name, true, true);
  return event;
};

module.exports = function (element) {
  if (MutationObserver === null || MutationObserver === undefined) {
    // MutationObserver is not supported
    return;
  }

  var i = instances.get(element);
  var onMutationObserver = function () {
    update(element);
    element.dispatchEvent(createDOMEvent('ps-dom-change'));
  };

  i.observer = new MutationObserver(onMutationObserver);
  onMutationObserver();

  var config = { childList: true, subtree: true };
  i.observer.observe(element, config);
};
