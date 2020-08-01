/*Write a program to make a stopwatch which takes the timer to be set from the user.*/

var stopwatch = function () {
  var startAt = 0;
  var lapse = 0;

  var now = function () {
    return new Date().getTime();
  };

  this.start = function () {
    startAt = startAt ? startAt : now();
  };

  this.stop = function () {
    lapse = startAt ? lapse + now() - startAt : lapse;
    startAt = 0;
  };

  this.reset = function () {
    lapse = startAt = 0;
  };

  this.time = function () {
    return lapse + (startAt ? now() - startAt : 0);
  };
};

var x = new stopwatch();
var $time;
var clocktimer;

function pad(num, size) {
  var s = "0000" + num;
  return s.substr(s.length - size);
}

function formatTime(time) {
  var h = (m = s = ms = 0);
  var newTime = "";

  h = Math.floor(time / (60 * 60 * 1000));
  time = time % (60 * 60 * 1000);
  m = Math.floor(time / (60 * 1000));
  time = time % (60 * 1000);
  s = Math.floor(time / 1000);
  ms = time % 1000;

  newTime = pad(h, 2) + ":" + pad(m, 2) + ":" + pad(s, 2) + ":" + pad(ms, 3);
  return newTime;
}

function show() {
  $time = document.getElementById("time");
  update();
}

function update() {
  $time.innerHTML = formatTime(x.time());
}

function start() {
  clocktimer = setInterval("update()", 1);
  x.start();
}

function stop() {
  x.stop();
  clearInterval(clocktimer);
}

function reset() {
  stop();
  x.reset();
  update();
}
