var ease = (function () {
  'use strict';

  // # Ease
  // Helps with the tweens

  // Quarter circle
  var HALF_PI = Math.PI * 0.5;

  // The more elaborate scaling formulas
  // From: https://github.com/staltz/xstream/blob/master/src/extra/tween.ts
  var sine = function sine(x) {
    return 1 - Math.cos(x * HALF_PI);
  };
  var expo = function expo(x) {
    return Math.pow(2, 10 * (x - 1));
  };
  var circ = function circ(x) {
    return -1 * (Math.sqrt(1 - x * x) - 1);
  };

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

  var index = {
    quint: ease(function (x) {
      return x * x * x * x * x;
    }),
    quart: ease(function (x) {
      return x * x * x * x;
    }),
    cubic: ease(function (x) {
      return x * x * x;
    }),
    quad: ease(function (x) {
      return x * x;
    }),
    sine: ease(sine),
    expo: ease(expo),
    circ: ease(circ)
  };

  return index;

}());
//# sourceMappingURL=ease.js.map
