// # Ease
// Helps with the tweens

// Quarter circle
const HALF_PI = Math.PI * 0.5;

// Invert, the out part
const flip = fn => (x => 1 - fn(1 - x));

// Split in half, the in/out part
const fork = (a, b) => (x => ((x < 0.5) ? (a(2 * x) * 0.5) : (0.5 + (b(2 * (x - 0.5)) * 0.5))));

// Drive out, in/out from in, band together
// https://github.com/staltz/xstream/blob/master/src/extra/tween.ts
const ease = (fn) => {
  const fnOut = flip(fn);
  const fnInOut = fork(fn, fnOut);

  // Feed each with slope
  // (current position over duration)
  return {
    in: (t, d) => fn(t / d),
    out: (t, d) => fnOut(t / d),
    inOut: (t, d) => fnInOut(t / d),
  };
};

// The basic exponential definitions
const expoQueue = ['quad', 'cubic', 'quart', 'quint'];

// Collect above
const expo = expoQueue.reduce((obj, key, i) => {
  // But for the babel stuff, this would have been
  // ```Object.assign(obj, { [key]: ... })```
  /* eslint-disable no-param-reassign */
  obj[key] = ease(x => Math.pow(x, i + 2));

  return obj;
}, {
  // Start here
  expo: ease(x => Math.pow(2, 10 * (x - 1))),
});

// The smooth
const sine = {
  sine: ease(x => 1 - Math.cos(x * HALF_PI)),
};

// The snaky
const circ = {
  circ: ease(x => -1 * (Math.sqrt(1 - (x * x)) - 1)),
};

export default Object.assign(expo, sine, circ);

