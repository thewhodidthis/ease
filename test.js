const test = require('tape');
const ease = require('./');

const sub = (a, b) => a - b;
const sum = (a, b) => a + b;

// Add up all the values in array
const summer = view => view.reduce(sum);

// Collect results from each easing type
const runner = (easing) => {
  const data = [];

  for (let x = 0, total = 1; x < total; x += 0.1) {
    // Result for x
    const y = easing(x, total);

    // Diff x and y
    const d = sub(x, y);

    data.push(d);
  }

  return data;
};

// In order from the less to the more pronounced
const easingTypes = 'sine,quad,cubic,circ,quart,quint,expo'.split(',');
const easings = easingTypes.map(v => ease[v]);

test('will trend as expected', (t) => {
  const easeIn = easings.map(v => v.in);
  const easeOut = easings.map(v => v.out);
  const easeInOut = easings.map(v => v.inOut);

  // Each type produces an aggregate stronger than the previous one
  const increasing = easeIn.map(runner).map(summer).reduce((a, b, i) => {
    const typeA = easingTypes[i - 1];
    const typeB = easingTypes[i];

    t.ok(b > a, `Ease in ${typeA} softer than ${typeB}`);

    return b;
  });

  // Ease in: sum is positive
  t.ok(increasing > 0, 'Ease in goes positive');

  // Each type produces an aggregate stronger than the previous one
  const decreasing = easeOut.map(runner).map(summer).reduce((a, b, i) => {
    const typeA = easingTypes[i - 1];
    const typeB = easingTypes[i];

    // These are negative
    t.ok(a > b, `Ease out ${typeA} softer than ${typeB}`);

    return b;
  });

  // Ease out: sum is negative
  t.ok(decreasing < 0, 'Ease out goes negative');

  easeInOut.map(runner).map((v, i) => {
    const type = easingTypes[i];

    // This'll be empty at the end of each iteration
    const target = Array.from(v);

    // Going faster
    const shiftL = target.splice(0, target.length * 0.5);

    // Going slower
    const shiftR = target.splice(0, target.length);

    const trendL = shiftL.reduce(sum);
    const trendR = shiftR.reduce(sum);

    t.ok(trendL > 0, `Ease in/out ${type} in goes positive`);
    t.ok(trendR < 0, `Ease in/out ${type} out goes negative`);

    t.notOk(Math.round(trendL + trendR), `Ease in/out ${type} parts look similar`);

    return [trendL, trendR];
  }).reduce((a, b, i) => {
    const typeA = easingTypes[i - 1];
    const typeB = easingTypes[i];

    const [a1, a2] = a;
    const [b1, b2] = b;

    t.ok(a1 < b1, `Ease in/out ${typeA} in softer than ${typeB}`);
    t.ok(a2 > b2, `Ease in/out ${typeA} out softer than ${typeB}`);

    return b;
  });

  t.end();
});

