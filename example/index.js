'use strict';

var TAU = Math.PI * 2;

var Animation = function Animation(callback) {
  var frameId;

  var tick = function tick(now) {
    callback(now);

    if (frameId) {
      frameId = window.requestAnimationFrame(tick);
    }
  };

  var play = function play() {
    if (!frameId) {
      frameId = window.requestAnimationFrame(tick);
    }
  };

  var stop = function stop() {
    if (frameId) {
      frameId = window.cancelAnimationFrame(frameId);
    }
  };

  return {
    play,
    stop,
  }
};

var CurveBall = function CurveBall(canvas, easing) {
  var master = canvas.getContext('2d');

  var center = {
    x: canvas.width * 0.5,
    y: canvas.height * 0.5
  };

  var past = 0;
  var then = Date.now();
  var duration = canvas.height - 10;

  var boot = function boot(t) {
    then = Date.now();
    past = t || 0;
  };

  var animation = new Animation(function () {
    var now = Date.now();
    var delta = now - then;

    var t = (past + delta * 0.1) % (duration + 8);
    var r = easing(t, duration) * canvas.height;

    if (t >= duration) {
      animation.stop();
    } else {
      draw(r);
    }

    boot(t);
  });

  var curve = function() {
    var buffer = canvas.cloneNode().getContext('2d');
    var gap = 10;
    var w = canvas.width - gap;
    var h = canvas.height - gap;

    for (var x = gap; x < w; x += 3) {
      var y = easing(x, w) * (h - gap);

      buffer.fillStyle = '#fff';

      buffer.save();
      buffer.translate(0, h);
      buffer.scale(1, -1);
      buffer.beginPath();
      buffer.arc(x, y, 1, 0, TAU);
      buffer.restore();

      buffer.fill();
    }

    return buffer.canvas;
  }();

  var ball = function ball(r) {
    var buffer = canvas.cloneNode().getContext('2d');
    var x = canvas.width * 0.5;
    var y = canvas.height * 0.5;

    buffer.beginPath();
    buffer.arc(x, y, r, 0, TAU);

    buffer.fillStyle = '#f80';
    buffer.fill();

    return buffer.canvas;
  };

  var draw = function draw(r) {
    var r = r || 0;

    master.clearRect(0, 0, canvas.width, canvas.height);
    master.drawImage(ball(r), 0, 0);
    master.drawImage(curve, 0, 0);
  };

  var play = function play() {
    boot();
    draw();

    animation.play();
  };

  var stop = function stop() {
    boot();
    draw();

    animation.stop();
  };

  return {
    draw,
    play,
    stop
  };
};

var types = 'sine,quad,cubic,quart,circ,expo'.split(',');
var paths = 'in,out,inOut'.split(',');

var plots = document.querySelectorAll('canvas');
var items = document.querySelectorAll('li');

// This is ugly
types.forEach(function (type, j) {
  paths.forEach(function (path, i) {
    var indx = i + (j * 3);
    var plot = plots[indx];
    var item = items[indx];

    var easing = ease[type][path];
    var curveBall = new CurveBall(plot, easing);

    curveBall.draw();

    item.setAttribute('data-ease', type + '/' + path);

    plot.addEventListener('mouseenter', function onMouseEnter() {
      curveBall.play();
    }, false);

    plot.addEventListener('mouseleave', function onMouseLeave() {
      curveBall.stop();
    }, false);
  });
});

