'use strict';

var ServerTiming = require("../index");

describe("Server-Timing ", function() {

	var timing = new ServerTiming();

	it("should start a timer with the name 'Database Query'", function(done) {

		var result = timing.startTimer("Database Query");
		result.should.not.equal(false);

		setTimeout(done, 112);
	});

	it("should stop a timer with the name 'Database Query'", function(done) {

		var time = timing.stopTimer("Database Query");
		(time > 0).should.equal(true);

		return done();
	});

	it("should NOT stop a timer that was not previously started", function(done) {

		var time = timing.stopTimer("Bullshit");
		time.should.equal(false);

		return done();
	});

	it("should add an external metric 'Image Processing'", function(done) {

		var time = timing.addMetric("Image Processing", 12365);
		(time > 0).should.equal(true);

		return done();
	});

	it("should NOT add an external metric with non number value", function(done) {

		var time = timing.addMetric("Bullshit", "a");
		time.should.equal(false);

		return done();
	});

	it("should NOT have reference to timer after it is cleared", function(done) {

		timing.startTimer("Failed Operation");
		timing.clearTimer("Failed Operation");
		var header = timing.generateHeader();
		header.indexOf("Failed Operation").should.equal(-1);

		return done();
	});

	it("should print the Server-Timing header string", function(done) {

		var header = timing.generateHeader();
		console.log(header);
		(header.length > 0).should.equal(true);

		return done();
	});
});

describe("Server-Timing fluent interface ", function() {

	var timing = new ServerTiming();
	var timer;

	before("start a timer with the name 'Database Query'", function(done) {

		timer = timing.startTimer("Database Query");

		setTimeout(done, 112);
	});

	it("should stop a timer via the fluent interface", function(done) {

		var time = timer.stop();
		(time > 0).should.equal(true);

		return done();
	});

	it("should return the same value for an already stopped timer", function(done) {

		var time = timer.stop();
		(time > 0).should.equal(true);

		return done();
	});

	it("should NOT have reference to timer after it is cleared", function(done) {

		timer.clear();
		var header = timing.generateHeader();
		header.indexOf("Database Query").should.equal(-1);

		return done();
	});

});
