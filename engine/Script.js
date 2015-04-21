/*jslint node: true*/
/*jslint nomen: true*/

"use strict";

var
  Time = require('./Time');

module.exports = function (def) {
  
  if (typeof def !== 'object') {
    throw new Error('Invalid Script arguments. Expected object, got ', def);
  }
  
  this.run = function () {
    var scriptChunk = function (startTime) {
      var time, chunks;
      
      function initChunk(chunk) {
        chunk.addAt(time);
      }
      
      startTime = Time.parse(startTime);
      for (time in def) {
        if (def.hasOwnProperty(time)) {
          chunks = def[time];
          time = Time.parse(time) + startTime;
          if (typeof chunks === 'function') {
            chunks = [chunks];
          }
          chunks.forEach(initChunk);
        }
      }
    };
    
    scriptChunk.addAt = function (time) {
      scriptChunk(time);
    };
    
    return scriptChunk;
  };
};