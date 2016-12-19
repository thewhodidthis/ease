export function easeIn(t, f, d) {
  // TODO: Explain, t: rise, f: powerOf, d: run, v: slope
  const v = (d > 1) ? t / d : t;

  return Math.pow(v, f);
}

export function easeOut(t, f, d, s) {
  const v = t / (d || 1);
  const a = s || 1;

  return a - easeIn(a - v, f);
}

export function easeInOut(t, f, d) {
  // Get midpoint
  const m = 0.5 * (d || 1);

  // Slow down past the halfway point
  if (t > m) {
    return easeOut(t, f, m, 2) * 0.5;
  }

  // Speed up during first half
  return easeIn(t, f, m) * 0.5;
}

// TODO: Try out macros for these?
export function inQuad(t, d) {
  // Better off using the spread operator for passing of arguments?
  return easeIn(t, 2, d);
}

export function inCubic(t, d) {
  return easeIn(t, 3, d);
}

export function inQuart(t, d) {
  return easeIn(t, 4, d);
}

export function inQuint(t, d) {
  return easeIn(t, 5, d);
}

export function outQuad(t, d) {
  return easeOut(t, 2, d);
}

export function outCubic(t, d) {
  return easeOut(t, 3, d);
}

export function outQuart(t, d) {
  return easeOut(t, 4, d);
}

export function outQuint(t, d) {
  return easeOut(t, 5, d);
}

export function inOutQuad(t, d) {
  return easeInOut(t, 2, d);
}

export function inOutCubic(t, d) {
  return easeInOut(t, 3, d);
}

export function inOutQuart(t, d) {
  return easeInOut(t, 4, d);
}

export function inOutQuint(t, d) {
  return easeInOut(t, 5, d);
}

