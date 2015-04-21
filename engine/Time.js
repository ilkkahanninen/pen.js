/*jslint node: true*/
/*jslint nomen: true*/

"use strict";

var
  _bpm = 120,
  _beatsPerBar = 4;

exports.setBPM = function (bpm) {
  _bpm = bpm;
};

exports.getBPM = function () {
  return _bpm;
};

exports.parse = function (time) {
  var m;
  switch (typeof time) {
  case 'number':
    return time;
  case 'string':
    m = time.match(/(\d+)\:(\d+)/);
    if (m) {
      return (parseInt(m[1], 10) * _beatsPerBar + parseInt(m[2], 10)) * 60 / _bpm;
    }
    break;
  }
  throw new Error('Invalid time signature:' + time);
};
