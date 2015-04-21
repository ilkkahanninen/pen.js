/*jslint node: true*/
/*global describe, it*/
"use strict";

var
  Time = require("../engine/Time.js"),
  assert = require("assert");

describe("Time", function () {
  
  describe("Song measure", function () {
    it("should return the same bpm as set", function () {
      Time.setBPM(100);
      assert.equal(100, Time.getBPM());
      Time.setBPM(1000);
      assert.equal(1000, Time.getBPM());
    });
  });
  
  describe("Parsing", function () {
    it("should return 0 for 0:0", function () {
      assert.equal(0, Time.parse("0:0"));
    });
    it("should return same number for numbers", function () {
      assert.equal(0, Time.parse(0));
      assert.equal(10, Time.parse(10));
      assert.equal(5.5, Time.parse(5.5));
    });
    it("should throw Error on invalid time signatures", function () {
      assert.throws(function () { Time.parse("0:"); }, Error);
      assert.throws(function () { Time.parse(":0"); }, Error);
      assert.throws(function () { Time.parse("0"); }, Error);
      assert.throws(function () { Time.parse("x:x"); }, Error);
    });
    it("should return correct position for correct time signatures", function () {
      Time.setBPM(60);
      assert.equal(1, Time.parse("0:1"));
      assert.equal(2, Time.parse("0:2"));
      assert.equal(3, Time.parse("0:3"));
      assert.equal(4, Time.parse("1:0"));
      assert.equal(41, Time.parse("10:1"));
    });
  });
});