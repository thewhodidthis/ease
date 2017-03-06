'use strict';

var TAU = Math.PI * 2;

var plot = function plot(buffer, easing) {
  var w = buffer.canvas.width;
  var h = buffer.canvas.height;
  var g = 10;
  var d = 3;

  for (var x = g, n = w - g; x < n; x += d) {
    var y = easing(x, n) * (h - (2 * g));

    buffer.save();
    buffer.translate(0, h - g);
    buffer.scale(1, -1);

    buffer.beginPath();
    buffer.arc(x, y, 1, 0, TAU);
    buffer.fillStyle = '#fff';
    buffer.fill();

    buffer.restore();
  }
};

var list = document.getElementById('figure');
var adam = list.removeChild(list.querySelector('figure'));

var plots = [];
var types = 'sine,quad,cubic,quart,circ,expo'.split(',');
var paths = 'in,out,inOut'.split(',');

var totalPaths = paths.length;
var totalTypes = types.length;
var total = totalTypes * totalPaths;

for (var i = 0; i < total; i += 1) {
  var type = types[i % totalTypes];
  var path = paths[Math.floor(i / totalTypes)];

  var papa = adam.cloneNode(true);
  var turf = papa.firstChild.getContext('2d');

  plot(turf, ease[type][path]);

  papa.setAttribute('data-ease', type + '/' + path);
  papa.setAttribute('class', type + '-' + path);

  list.appendChild(papa);
}

