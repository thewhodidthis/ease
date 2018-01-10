(function () {
'use strict';

// # Ease
// Helps with the tweens

// Quarter circle
var HALF_PI = Math.PI * 0.5;

// Invert, the out part
var flip = function (fn) { return function (x) { return 1 - fn(1 - x); }; };

// Split in half, the in/out part
var fork = function (a, b) { return function (x) { return ((x < 0.5) ? (a(2 * x) * 0.5) : (0.5 + (b(2 * (x - 0.5)) * 0.5))); }; };

// Drive out, in/out from in, band together
// https://github.com/staltz/xstream/blob/master/src/extra/tween.ts
var from = function (fn) {
  var fnOut = flip(fn);
  var fnInOut = fork(fn, fnOut);

  // Feed each with slope
  // (current position over duration)
  return {
    in: function (t, d) { return fn(t / d); },
    out: function (t, d) { return fnOut(t / d); },
    inOut: function (t, d) { return fnInOut(t / d); }
  }
};

// The basic exponential definitions
var quad = from(function (x) { return Math.pow( x, 2 ); });
var cubic = from(function (x) { return Math.pow( x, 3 ); });
var quart = from(function (x) { return Math.pow( x, 4 ); });
var quint = from(function (x) { return Math.pow( x, 5 ); });
var expo = from(function (x) { return Math.pow( 2, (10 * (x - 1)) ); });

// The smooth
var sine = from(function (x) { return 1 - Math.cos(x * HALF_PI); });

// The snaky
var circ = from(function (x) { return -1 * (Math.sqrt(1 - (x * x)) - 1); });


var ease = Object.freeze({
	quad: quad,
	cubic: cubic,
	quart: quart,
	quint: quint,
	expo: expo,
	sine: sine,
	circ: circ
});

var draw = function (plot, easing) {
  var ref = plot.canvas;
  var w = ref.width;
  var h = ref.height;

  plot.strokeStyle = 'white';

  var next = function (x) {
    if (x > w) {
      return
    }

    var y = easing(x, w) * (h - 12);

    plot.save();
    plot.translate(0, h);
    plot.scale(1, -1);

    plot.moveTo(x + 0.5, y - h);
    plot.lineTo(x + 0.5, y);
    plot.restore();
    plot.stroke();

    next(x + 4);
  };

  next(3);
};

var paths = 'in inOut out'.split(' ');
var types = 'quad quint expo circ'.split(' ');
var total = types.length;

var items = document.querySelectorAll('li');

Array.from(items).forEach(function (item, i) {
  var plot = item.querySelector('canvas').getContext('2d');

  var type = types[i % total];
  var path = paths[Math.floor(i / total)];

  item.setAttribute('data-ease', (type + "." + path));

  draw(plot, ease[type][path]);
});

}());

