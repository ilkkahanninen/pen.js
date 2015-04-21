/*jslint node: true*/
/*global describe, it*/
"use strict";

var
  assert = require('assert'),
  Time = require('../engine/Time.js'),
  Envelope = require('../engine/Envelope.js');

describe("Envelope", function () {
  
  Time.setBPM(60);
  
  describe("Set", function () {
    
    it("should have zero duration", function () {
      var
        env = new Envelope(),
        chunk = env.set(123);
      assert.equal(0, chunk.duration);
    });
    
    it("should return the set value", function () {
      var
        env = new Envelope(),
        chunk = env.set(123);
      assert.equal(123, chunk(0));
      assert.equal(123, chunk(1));
    });
  });

  describe("Linear", function () {
    
    it("should have correct duration", function () {
      var
        env = new Envelope(),
        chunk = env.linear(0, 100, "0:2");
      assert.equal(2, chunk.duration);
    });
    
    it("should return the set value", function () {
      var
        env = new Envelope(),
        chunk = env.linear(0, 100, "0:2");
      
      assert.equal(0, chunk(0));
      assert.equal(50, chunk(1));
      assert.equal(100, chunk(2));
      assert.equal(100, chunk(3));
    });

    it("should allow add multiple sequential chunks", function () {
      var
        env = new Envelope(),
        chunk = env.linear(0, 100, "0:2");
      
      assert.doesNotThrow(function () { chunk.addAt(0); });
      assert.doesNotThrow(function () { chunk.addAt(2); });
      assert.equal(4, env.duration());
    });

    it("should not be possible to set interlacing chunks to an envelope", function () {
      var
        env = new Envelope(),
        chunk = env.linear(0, 100, "0:2");
      
      assert.doesNotThrow(function () { chunk.addAt(0); });
      assert.throws(function () { chunk.addAt(1); });
    });
    
  });
  
});