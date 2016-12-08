"use strict";
// polyfill

if (typeof Object.assign != 'function') {
  Object.assign = function (target, varArgs) {
    // .length of function is 2
    'use strict';

    if (target == null) {
      // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) {
        // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

module.exports = function (store, routeObject) {
  var statePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'auth';
  var redir = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  return Object.assign(routeObject, {
    onEnter: function onEnter(nextState, replace, callback) {
      var state = store.getState();
      var auth = statePath.split('.').reduce(function (o, i) {
        return o[i];
      }, state);
      if (!auth) {
        console.warn('Not authenticated. Redirecting');
        replace('/' + redir);
      }
      callback();
    }
  });
};