'use strict';

// # Ease
// Helps with the tweens

// Quarter circle
var HALF_PI = Math.PI * 0.5;

// Invert, the out part
var flip = function flip(fn) {
  return function (x) {
    return 1 - fn(1 - x);
  };
};

// Split in half, the in/out part
var fork = function fork(a, b) {
  return function (x) {
    return x < 0.5 ? a(2 * x) * 0.5 : 0.5 + b(2 * (x - 0.5)) * 0.5;
  };
};

// Drive out, in/out from in, band together
var ease = function ease(fn) {
  var fnOut = flip(fn);
  var fnInOut = fork(fn, fnOut);

  // Feed the slope
  return {
    in: function _in(t, d) {
      return fn(t / d);
    },
    out: function out(t, d) {
      return fnOut(t / d);
    },
    inOut: function inOut(t, d) {
      return fnInOut(t / d);
    }
  };
};

// The basic exponential definitions
var baseNames = ['quad', 'cubic', 'quart', 'quint'];
var base = baseNames.reduce(function (obj, key, i) {
  /* eslint-disable no-param-reassign */
  obj[key] = ease(function (x) {
    return Math.pow(x, i + 2);
  });

  return obj;
}, {});

// The more elaborate scaling formulas
// From: https://github.com/staltz/xstream/blob/master/src/extra/tween.ts
var sine = {
  sine: ease(function (x) {
    return 1 - Math.cos(x * HALF_PI);
  })
};

var expo = {
  expo: ease(function (x) {
    return Math.pow(2, 10 * (x - 1));
  })
};

var circ = {
  circ: ease(function (x) {
    return -1 * (Math.sqrt(1 - x * x) - 1);
  })
};

var index = Object.assign(base, sine, expo, circ);

module.exports = index;
