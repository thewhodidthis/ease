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

// Cubic bezier control point approximations for Penner's equations
// From: https://github.com/zz85/cubic-bezier-approximations
// Also: https://github.com/KinkumaDesign/CustomMediaTimingFunction
var data = {
  quad: {
    in: [0.26, 0, 0.6, 0.2],
    out: [0.4, 0.8, 0.74, 1],
    inOut: [0.48, 0.04, 0.52, 0.96]
  },
  cubic: {
    in: [0.4, 0, 0.68, 0.06],
    out: [0.32, 0.94, 0.6, 1],
    inOut: [0.66, 0, 0.34, 1]
  },
  quart: {
    in: [0.52, 0, 0.74, 0],
    out: [0.26, 1, 0.48, 1],
    inOut: [0.76, 0, 0.24, 1]
  },
  quint: {
    in: [0.64, 0, 0.78, 0],
    out: [0.22, 1, 0.36, 1],
    inOut: [0.84, 0, 0.16, 1]
  },
  sine: {
    in: [0.32, 0, 0.6, 0.36],
    out: [0.4, 0.64, 0.68, 1],
    inOut: [0.36, 0, 0.64, 1]
  },
  expo: {
    in: [0.66, 0, 0.86, 0],
    out: [0.14, 1, 0.34, 1],
    inOut: [0.9, 0, 0.1, 1]
  },
  circ: {
    in: [0.54, 0, 1, 0.44],
    out: [0, 0.56, 0.46, 1],
    inOut: [0.88, 0.14, 0.12, 0.86]
  }
};

var TAU = Math.PI * 2;
var plot = function (buffer, easing) {
  var w = buffer.canvas.width;
  var h = buffer.canvas.height;
  var g = 10;
  var d = 3;

  for (var x = g, n = w - g; x < n; x += d) {
    var y = easing(x, n) * (h - (2 * g));

    buffer.save();
    buffer.translate(0, h - g);
    buffer.scale(1, -1);

    buffer.beginPath();
    buffer.arc(x, y, 1, 0, TAU);
    buffer.fill();

    buffer.restore();
  }
};

var ofInterest = ['quad', 'quint', 'expo', 'circ'];

var paths = 'in,out,inOut'.split(',');
var types = Object.keys(data).filter(function (v) { return ofInterest.indexOf(v) !== -1; });

var list = document.querySelector('ul');
var adam = list.removeChild(list.querySelector('li'));

var totalPaths = paths.length;
var totalTypes = types.length;
var totalGrand = totalTypes * totalPaths;

for (var i = 0; i < totalGrand; i += 1) {
  var type = types[i % totalTypes];
  var path = paths[Math.floor(i / totalTypes)];

  var papa = adam.cloneNode(true);
  var turf = papa.querySelector('canvas').getContext('2d');

  var points = data[type][path].join(', ');
  var easing = ease[type][path];

  papa.setAttribute('data-ease', (type + "." + path));
  papa.setAttribute('style', ("transition-timing-function: cubic-bezier(" + points + ");"));

  list.appendChild(papa);

  plot(turf, easing);
}

}());

