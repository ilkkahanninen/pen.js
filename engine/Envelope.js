/*jslint node: true*/
/*jslint nomen: true*/

"use strict";

var
  Time = require('./Time');

module.exports = function () {
  var
    envelope = [],
    envDuration = 0;
  
  // Common envelope chunk interface
  function initChunk(chunk, duration) {
    chunk.duration = duration;
    chunk.addAt = function (time) {
      if (time < envDuration) {
        throw new Error('Tried to insert an envelope chunk to invalid position');
      }
      envelope.push({time: time, chunk: chunk});
      envDuration = time + chunk.duration;
    };
    return chunk;
  }
  
  // Envelope chuck creators
  this.set = function (value) {
    var set = function () {
      return value;
    };
    return initChunk(set, 0);
  };
  
  this.linear = function (from, to, lengthStr) {
    var
      length = Time.parse(lengthStr),
      linear = function (t) {
        return from + (to - from) * Math.max(0, Math.min(1, t / length));
      };
    return initChunk(linear, length);
  };
  
  // Other
  this.duration = function () {
    return envDuration;
  };
};