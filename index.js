'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function easeIn(t, f, d) {
  var v = d > 1 ? t / d : t;

  return Math.pow(v, f);
}

function easeOut(t, f, d) {
  var v = t / (d || 1);

  return 1 - easeIn(1 - v, f);
}

function easeInOut(t, f, d) {
  var v = t / (d || 1);

  // Past the halfway point
  if (v > 0.5) {
    // Not worth refactoring easeIn just to be able to use easeOut below
    return 1 - easeIn((1 - v) * 2, f) * 0.5;
  }

  return easeIn(v * 2, f) * 0.5;
}

function inQuad(t, d) {
  return easeIn(t, 2, d);
}

function inCubic(t, d) {
  return easeIn(t, 3, d);
}

function inQuart(t, d) {
  return easeIn(t, 4, d);
}

function inQuint(t, d) {
  return easeIn(t, 5, d);
}

function outQuad(t, d) {
  return easeOut(t, 2, d);
}

function outCubic(t, d) {
  return easeOut(t, 3, d);
}

function outQuart(t, d) {
  return easeOut(t, 4, d);
}

function outQuint(t, d) {
  return easeOut(t, 5, d);
}

function inOutQuad(t, d) {
  return easeInOut(t, 2, d);
}

function inOutCubic(t, d) {
  return easeInOut(t, 3, d);
}

function inOutQuart(t, d) {
  return easeInOut(t, 4, d);
}

function inOutQuint(t, d) {
  return easeInOut(t, 5, d);
}

exports.easeIn = easeIn;
exports.easeOut = easeOut;
exports.easeInOut = easeInOut;
exports.inQuad = inQuad;
exports.inCubic = inCubic;
exports.inQuart = inQuart;
exports.inQuint = inQuint;
exports.outQuad = outQuad;
exports.outCubic = outCubic;
exports.outQuart = outQuart;
exports.outQuint = outQuint;
exports.inOutQuad = inOutQuad;
exports.inOutCubic = inOutCubic;
exports.inOutQuart = inOutQuart;
exports.inOutQuint = inOutQuint;
