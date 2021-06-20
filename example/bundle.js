(() => {
  var __defProp = Object.defineProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // ../main.js
  var main_exports = {};
  __export(main_exports, {
    circ: () => circ,
    cubic: () => cubic,
    expo: () => expo,
    quad: () => quad,
    quart: () => quart,
    quint: () => quint,
    sine: () => sine
  });
  var HALF_PI = Math.PI * 0.5;
  var flip = (fn) => (x) => 1 - fn(1 - x);
  var fork = (a, b) => (x) => x < 0.5 ? a(2 * x) * 0.5 : 0.5 + b(2 * (x - 0.5)) * 0.5;
  var from = (fn) => {
    const fnOut = flip(fn);
    const fnInOut = fork(fn, fnOut);
    return {
      in: (t, d) => fn(t / d),
      out: (t, d) => fnOut(t / d),
      inOut: (t, d) => fnInOut(t / d)
    };
  };
  var quad = from((x) => Math.pow(x, 2));
  var cubic = from((x) => Math.pow(x, 3));
  var quart = from((x) => Math.pow(x, 4));
  var quint = from((x) => Math.pow(x, 5));
  var expo = from((x) => Math.pow(2, 10 * (x - 1)));
  var sine = from((x) => 1 - Math.cos(x * HALF_PI));
  var circ = from((x) => -1 * (Math.sqrt(1 - x * x) - 1));

  // index.js
  var draw = (target, source) => {
    const { width: w, height: h } = target.canvas;
    target.translate(w * 0.5, h * 0.5);
    target.rotate(Math.PI * 0.25);
    const next = (x = h, i = 0) => {
      if (x < 0) {
        return;
      }
      const y = source(x, h) * h * 0.625;
      target.fillStyle = i % 2 === 0 ? "#888" : "#000";
      target.fillRect(-y * 0.5, -y * 0.5, y, y);
      target.rotate(y * 1e-3);
      next(x - 5, i + 1);
    };
    next();
  };
  var paths = "in inOut out".split(" ");
  var types = "quad quint expo circ".split(" ");
  var total = types.length;
  var items = document.querySelectorAll("li");
  Array.from(items).forEach((item, i) => {
    const plot = item.querySelector("canvas").getContext("2d");
    const type = types[i % total];
    const path = paths[Math.floor(i / total)];
    item.setAttribute("data-ease", `${type}.${path}`);
    draw(plot, main_exports[type][path]);
  });
})();
