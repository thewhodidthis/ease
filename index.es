// Quarter circle
const HALF_PI = Math.PI * 0.5;

// Turn things around, the out part
const flip = fn => (x => 1 - fn(1 - x));

// Split down the middle, the in/out part
const fork = (a, b) => (x => ((x < 0.5) ? (a(2 * x) * 0.5) : (0.5 + (b(2 * (x - 0.5)) * 0.5))));

// The more elaborate scaling formulas
const sine = x => 1 - Math.cos(x * HALF_PI);
const expo = x => Math.pow(2, 10 * (x - 1));
const circ = x => -1 * (Math.sqrt(1 - (x * x)) - 1);

// Drive out, in/out from in, band together
const ease = (fn) => {
  const fnOut = flip(fn);
  const fnInOut = fork(fn, fnOut);

  return {
    in: (t, d) => fn(t / d),
    out: (t, d) => fnOut(t / d),
    inOut: (t, d) => fnInOut(t / d),
  };
};

export default {
  quint: ease(x => x * x * x * x * x),
  quart: ease(x => x * x * x * x),
  cubic: ease(x => x * x * x),
  quad: ease(x => x * x),
  sine: ease(sine),
  expo: ease(expo),
  circ: ease(circ),
};

