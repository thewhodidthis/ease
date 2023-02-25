var ease = (function(exports) {
  "use strict"

  // # Ease
  // Helps with the tweens

  // Quarter circle
  const HALF_PI = Math.PI * 0.5

  // Invert, the out part
  const flip = fn => x => 1 - fn(1 - x)

  // Split in half, the in/out part
  const fork = (a, b) => x => ((x < 0.5) ? (a(2 * x) * 0.5) : (0.5 + (b(2 * (x - 0.5)) * 0.5)))

  // Drive out, in/out from in, band together
  // https://github.com/staltz/xstream/blob/master/src/extra/tween.ts
  const from = (fn) => {
    const fnOut = flip(fn)
    const fnInOut = fork(fn, fnOut)

    // Feed each with slope
    // (current position over duration)
    return {
      in: (t, d) => fn(t / d),
      out: (t, d) => fnOut(t / d),
      inOut: (t, d) => fnInOut(t / d),
    }
  }

  // The basic exponential definitions
  const quad = from(x => Math.pow(x, 2))
  const cubic = from(x => Math.pow(x, 3))
  const quart = from(x => Math.pow(x, 4))
  const quint = from(x => Math.pow(x, 5))
  const expo = from(x => Math.pow(2, (10 * (x - 1))))

  // The smooth
  const sine = from(x => 1 - Math.cos(x * HALF_PI))

  // The snaky
  const circ = from(x => -1 * (Math.sqrt(1 - (x * x)) - 1))

  exports.circ = circ
  exports.cubic = cubic
  exports.expo = expo
  exports.quad = quad
  exports.quart = quart
  exports.quint = quint
  exports.sine = sine

  return exports
})({})
