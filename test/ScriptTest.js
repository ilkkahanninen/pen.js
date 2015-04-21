/*jslint node: true*/
/*global describe, it*/
"use strict";

var
  Script = require('../engine/Script'),
  Envelope = require('../engine/Envelope'),
  Time = require('../engine/Time'),
  assert = require('assert');

describe("Script", function () {
  
  Time.setBPM(60);
  
  it('should init an envelope with singular chunks', function () {
    var env = new Envelope(), script;
    
    assert.doesNotThrow(function () {
      script = new Script({
        '0:0': env.set(0),
        '1:0': env.linear(0, 1, '1:0')
      });
    });
    
    assert.equal(0, env.duration());
    (script.run())(0);
    assert.equal(8, env.duration());
  });
  
  it('should init an envelope with arrays of chunks', function () {
    var env = new Envelope(), env2 = new Envelope(), script;
    
    assert.doesNotThrow(function () {
      script = new Script({
        '0:0': [
          env.set(0),
          env2.set(1)
        ],
        '1:0': [
          env.linear(0, 1, '1:0'),
          env2.linear(0, 1, '2:0')
        ]
      });
    });
    
    (script.run())(0);
    assert.equal(8, env.duration());
    assert.equal(12, env2.duration());
  });
  
  it('should fail with invalid argument', function () {
    var x;
    assert.throws(function () { x = new Script(); });
    assert.throws(function () { x = new Script('xxxxx'); });
  });
  
  it('should work with multiple insertions of same script', function () {
    var env = new Envelope(), script, mainScript;
    
    assert.doesNotThrow(function () {
      script = new Script({
        '0:0': env.linear(0, 1, '1:0')
      });
      mainScript = new Script({
        '0:0': script.run(),
        '1:0': script.run()
      });
    });
    
    assert.equal(0, env.duration());
    (mainScript.run())(0);
    assert.equal(8, env.duration());
  });
});