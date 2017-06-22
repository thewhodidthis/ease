import * as ease from '../index.es';

const TAU = Math.PI * 2;
const plot = (buffer, easing) => {
  const w = buffer.canvas.width;
  const h = buffer.canvas.height;
  const g = 10;
  const d = 3;

  for (let x = g, n = w - g; x < n; x += d) {
    const y = easing(x, n) * (h - (2 * g));

    buffer.save();
    buffer.translate(0, h - g);
    buffer.scale(1, -1);

    buffer.beginPath();
    buffer.arc(x, y, 1, 0, TAU);
    buffer.fill();

    buffer.restore();
  }
};

const list = document.querySelector('ul');
const adam = list.removeChild(list.querySelector('li'));

// Cubic bezier control point approximations for Penner's equations
// From: https://github.com/zz85/cubic-bezier-approximations
// Also: https://github.com/KinkumaDesign/CustomMediaTimingFunction
const data = {
  quad: {
    in: [0.26, 0, 0.6, 0.2],
    out: [0.4, 0.8, 0.74, 1],
    inOut: [0.48, 0.04, 0.52, 0.96],
  },
  cubic: {
    in: [0.4, 0, 0.68, 0.06],
    out: [0.32, 0.94, 0.6, 1],
    inOut: [0.66, 0, 0.34, 1],
  },
  quart: {
    in: [0.52, 0, 0.74, 0],
    out: [0.26, 1, 0.48, 1],
    inOut: [0.76, 0, 0.24, 1],
  },
  quint: {
    in: [0.64, 0, 0.78, 0],
    out: [0.22, 1, 0.36, 1],
    inOut: [0.84, 0, 0.16, 1],
  },
  sine: {
    in: [0.32, 0, 0.6, 0.36],
    out: [0.4, 0.64, 0.68, 1],
    inOut: [0.36, 0, 0.64, 1],
  },
  expo: {
    in: [0.66, 0, 0.86, 0],
    out: [0.14, 1, 0.34, 1],
    inOut: [0.9, 0, 0.1, 1],
  },
  circ: {
    in: [0.54, 0, 1, 0.44],
    out: [0, 0.56, 0.46, 1],
    inOut: [0.88, 0.14, 0.12, 0.86],
  },
};

const types = Object.keys(data);
const paths = 'in,out,inOut'.split(',');

const totalPaths = paths.length;
const totalTypes = types.length;
const total = totalTypes * totalPaths;

for (let i = 0; i < total; i += 1) {
  const type = types[i % totalTypes];
  const path = paths[Math.floor(i / totalTypes)];

  const papa = adam.cloneNode(true);
  const turf = papa.firstChild.getContext('2d');

  const points = data[type][path].join(', ');
  const easing = ease[type][path];

  papa.setAttribute('data-ease', `${type}.${path}`);
  papa.setAttribute('style', `transition-timing-function: cubic-bezier(${points});`);

  list.appendChild(papa);

  plot(turf, easing);
}

