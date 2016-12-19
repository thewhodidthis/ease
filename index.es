export function easeIn(t, f, d) {
  const v = (d > 1) ? t / d : t;

  return Math.pow(v, f);
}

export function easeOut(t, f, d) {
  const v = t / (d || 1);

  return 1 - easeIn(1 - v, f);
}

export function easeInOut(t, f, d) {
  const v = t / (d || 1);

  // Past the halfway point
  if (v > 0.5) {
    // Not worth refactoring easeIn just to be able to use easeOut below
    return 1 - (easeIn((1 - v) * 2, f) * 0.5);
  }

  return easeIn(v * 2, f) * 0.5;
}

export function inQuad(t, d) {
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

