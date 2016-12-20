'use strict';

var TAU = Math.PI * 2;

var types = 'easeIn,easeOut,easeInOut'.split(',');
var plots = document.querySelectorAll('canvas');

var Animation = function Animation(callback) {
  var frameId;

  var tick = function tick(now) {
    callback(now);

    if (frameId) {
      frameId = window.requestAnimationFrame(tick);
    }
  };

  var stop = function stop() {
    if (frameId) {
      frameId = window.cancelAnimationFrame(frameId);
    }
  };

  var play = function play() {
    if (!frameId) {
      frameId = window.requestAnimationFrame(tick);
    }
  };

  return {
    play,
    stop,
    tick
  }
};

var CurveBall = function CurveBall(canvas, ease, f) {
  var master = canvas.getContext('2d');

  var center = {
    x: canvas.width * 0.5,
    y: canvas.height * 0.5
  };

  var past = 0;
  var then = Date.now();
  var duration = canvas.height - 10;
  var f = f || 1;

  var animation = new Animation(function () {
    var now = Date.now();
    var delta = now - then;

    var t = (past + delta * 0.1) % duration;
    var r = ease(t, f, duration) * canvas.height;

    if (r >= duration) {
      animation.stop();
    } else {
      draw(r);
    }

    reset(t);
  });

  var reset = function reset(t) {
    then = Date.now();
    past = t || 0;
  };

  var curve = function() {
    var buffer = canvas.cloneNode().getContext('2d');

    for (var i = 0, total = canvas.width; i < total; i += 1) {
      var x = i;
      var y = ease(i, f, canvas.width) * canvas.height;

      buffer.save();
      buffer.translate(0, buffer.canvas.height);
      buffer.scale(1, -1);
      buffer.beginPath();
      buffer.arc(x, y, 1, 0, TAU);
      buffer.restore();
      buffer.fillStyle = '#fff';
      buffer.fill();
    }

    return buffer.canvas;
  }();

  var ball = function(r) {
    var buffer = canvas.cloneNode().getContext('2d');
    var x = canvas.width * 0.5;
    var y = canvas.height * 0.5;

    buffer.beginPath();
    buffer.arc(x, y, r, 0, TAU);
    buffer.fillStyle = '#f00';
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
    reset();
    draw();

    animation.play();
  };

  var stop = function stop() {
    reset();
    draw();

    animation.stop();
  };

  return {
    draw,
    play,
    stop
  };
};

plots.forEach(function(canvas, i) {
  // Calculate easing factor
  var f = 2 + i % 4;

  // Calculate easing type index
  var e = Math.floor(i / 4);

  // Get easing type (in, out, inOut)
  var easeType = types[e];

  // Set easing
  var ease = Ease[easeType];

  // Or just incorporate the above inside of CurveBall so that less arguments are required
  var plot = new CurveBall(canvas, ease, f);

  plot.draw();

  canvas.addEventListener('mouseenter', function onMouseEnter() {
    plot.play();
  }, false);

  canvas.addEventListener('mouseleave', function onMouseLeave() {
    plot.stop();
  }, false);
});

